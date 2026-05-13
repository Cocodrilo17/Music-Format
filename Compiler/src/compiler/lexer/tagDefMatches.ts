import type { DefsMatchingFn, TagDefToken } from '../types.ts';

const tagDefMatches: DefsMatchingFn = (tokens, fileText, matchingRegex, getLine, resolveEscapes) => {
  // tag tagname = "This is a tag"
  const tagMatches = fileText.matchAll(matchingRegex);
  for (const match of tagMatches) {
    const lineStart = getLine(match.index);
    const lineEnd = lineStart + match[0].split('\n').length - 1;

    tokens.push({
      kind: 'TAG_DEF',
      lineStart,
      lineEnd,
      index: match.index,
      tag: match.groups?.tag ?? '',
      metadata: resolveEscapes(match.groups?.quotedMetadata ?? match.groups?.rawMetadata ?? '')
    } satisfies TagDefToken);
  }
};

export default tagDefMatches;
