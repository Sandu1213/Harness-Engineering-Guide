local function is_external(target)
  return target:match("^https?://")
    or target:match("^mailto:")
    or target:match("^#")
end

local function publication_slug(target)
  local path = target:match("^([^#]+)") or target
  local basename = path:match("([^/]+)%.md$")
  if not basename then
    return nil
  end
  if basename:match("^%d%d%-[a-z0-9%-]+$") or basename:match("^[a-l]%-[a-z0-9%-]+$") then
    return basename
  end
  return nil
end

function Link(element)
  if is_external(element.target) then
    return element
  end

  local slug = publication_slug(element.target)
  if slug then
    element.target = "#" .. slug
    return element
  end

  return element.content
end

function Image(element)
  element.src = element.src:gsub("^%.%./%.%./diagrams/exported/", "diagrams/exported/")
  element.src = element.src:gsub("%.svg$", ".png")
  return element
end
