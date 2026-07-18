import assert from 'node:assert/strict';
import test from 'node:test';

import { assessToolInvocation } from './tool-invocation-assessment.mjs';

const contract = {
  version: 'chapter-11-v1',
  tools: [
    {
      name: 'document_read_metadata',
      version: 'v1',
      effectClass: 'read_only',
      requiredArguments: ['documentId'],
    },
    {
      name: 'document_update_metadata',
      version: 'v1',
      effectClass: 'reversible_write',
      requiredArguments: ['documentId', 'field', 'value'],
      approvalScope: 'metadata_write',
    },
  ],
};

function createInput({
  request = {
    correlationId: 'request-1',
    tool: { name: 'document_read_metadata', version: 'v1' },
    arguments: { documentId: 'chapter-11' },
  },
  environment = { status: 'ready' },
  approval = { status: 'active', scope: 'metadata_write' },
  invocationRecord,
} = {}) {
  return { contract, request, environment, approval, invocationRecord };
}

test('rejects an unknown tool without claiming a registry lookup', () => {
  assert.deepEqual(
    assessToolInvocation(
      createInput({
        request: {
          correlationId: 'request-1',
          tool: { name: 'document_delete', version: 'v1' },
          arguments: { documentId: 'chapter-11' },
        },
      }),
    ),
    {
      status: 'rejected',
      code: 'unknown_tool',
      correlationId: 'request-1',
    },
  );
});

test('rejects a request with missing required arguments', () => {
  assert.deepEqual(
    assessToolInvocation(
      createInput({
        request: {
          correlationId: 'request-2',
          tool: { name: 'document_read_metadata', version: 'v1' },
          arguments: {},
        },
      }),
    ),
    {
      status: 'rejected',
      code: 'invalid_arguments',
      correlationId: 'request-2',
      missingArguments: ['documentId'],
    },
  );
});

test('allows a known read-only candidate with injected prerequisites', () => {
  assert.deepEqual(assessToolInvocation(createInput()), {
    status: 'allowed',
    code: 'admission_allowed',
    correlationId: 'request-1',
  });
});

test('requires approval for a write candidate without an approval snapshot', () => {
  assert.deepEqual(
    assessToolInvocation(
      createInput({
        request: {
          correlationId: 'request-3',
          tool: { name: 'document_update_metadata', version: 'v1' },
          arguments: {
            documentId: 'chapter-11',
            field: 'status',
            value: 'complete',
          },
        },
        approval: null,
      }),
    ),
    {
      status: 'requires_approval',
      code: 'approval_missing',
      correlationId: 'request-3',
    },
  );
});

test('blocks an invocation record whose correlation id conflicts with the request', () => {
  assert.deepEqual(
    assessToolInvocation(
      createInput({
        invocationRecord: {
          correlationId: 'request-other',
          status: 'succeeded',
          verificationStatus: 'accepted',
        },
      }),
    ),
    {
      status: 'blocked',
      code: 'correlation_conflict',
      correlationId: 'request-1',
    },
  );
});

test('preserves a timed out invocation without readback as an unknown effect', () => {
  assert.deepEqual(
    assessToolInvocation(
      createInput({
        invocationRecord: {
          correlationId: 'request-1',
          status: 'timed_out',
          effectStatus: 'unknown',
        },
      }),
    ),
    {
      status: 'effect_unknown',
      code: 'timed_out_without_readback',
      correlationId: 'request-1',
      effectStatus: 'unknown',
    },
  );
});

test('requires evidence when a tool result is successful but not verified', () => {
  assert.deepEqual(
    assessToolInvocation(
      createInput({
        invocationRecord: {
          correlationId: 'request-1',
          status: 'succeeded',
          verificationStatus: 'not_run',
        },
      }),
    ),
    {
      status: 'needs_evidence',
      code: 'tool_result_not_verified',
      correlationId: 'request-1',
    },
  );
});
