function result(status, code, correlationId, extra = {}) {
  return { status, code, correlationId, ...extra };
}

function missingArguments(requiredArguments, argumentsObject) {
  return requiredArguments.filter((name) => {
    const value = argumentsObject?.[name];
    return typeof value !== 'string' || value.trim() === '';
  });
}

/**
 * Assess injected teaching objects without invoking a tool or granting authority.
 */
export function assessToolInvocation({
  contract,
  request,
  environment,
  approval,
  invocationRecord,
}) {
  const correlationId = request.correlationId;
  const descriptor = contract.tools.find((tool) => tool.name === request.tool.name);

  if (!descriptor) {
    return result('rejected', 'unknown_tool', correlationId);
  }

  if (descriptor.version !== request.tool.version) {
    return result('rejected', 'tool_version_mismatch', correlationId);
  }

  if (invocationRecord && invocationRecord.correlationId !== correlationId) {
    return result('blocked', 'correlation_conflict', correlationId);
  }

  const missing = missingArguments(descriptor.requiredArguments, request.arguments);
  if (missing.length > 0) {
    return result('rejected', 'invalid_arguments', correlationId, {
      missingArguments: missing,
    });
  }

  if (environment.status !== 'ready') {
    return result('blocked', 'environment_not_ready', correlationId);
  }

  if (
    invocationRecord?.status === 'timed_out' &&
    invocationRecord.effectStatus === 'unknown'
  ) {
    return result('effect_unknown', 'timed_out_without_readback', correlationId, {
      effectStatus: 'unknown',
    });
  }

  if (
    invocationRecord?.status === 'succeeded' &&
    invocationRecord.verificationStatus !== 'accepted'
  ) {
    return result('needs_evidence', 'tool_result_not_verified', correlationId);
  }

  if (descriptor.effectClass !== 'read_only') {
    if (!approval) {
      return result('requires_approval', 'approval_missing', correlationId);
    }

    if (approval.status !== 'active') {
      return result('requires_approval', `approval_${approval.status}`, correlationId);
    }

    if (approval.scope !== descriptor.approvalScope) {
      return result('requires_approval', 'approval_scope_mismatch', correlationId);
    }
  }

  return result('allowed', 'admission_allowed', correlationId);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demonstration = assessToolInvocation({
    contract: {
      version: 'chapter-11-v1',
      tools: [
        {
          name: 'document_read_metadata',
          version: 'v1',
          effectClass: 'read_only',
          requiredArguments: ['documentId'],
        },
      ],
    },
    request: {
      correlationId: 'request-demo',
      tool: { name: 'document_read_metadata', version: 'v1' },
      arguments: { documentId: 'chapter-11' },
    },
    environment: { status: 'ready' },
  });

  console.log(JSON.stringify(demonstration, null, 2));
}
