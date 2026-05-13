import type { DefsMatchingFn, StatusDefToken } from '../types.ts';

const statusDefMatches: DefsMatchingFn = (tokens, fileText, matchingRegex, getLine, resolveEscapes) => {
  // status#ffffff v = founded <- "white"
  const statusMatches = fileText.matchAll(matchingRegex);
  for (const match of statusMatches) {
    const lineStart = getLine(match.index);
    const lineEnd = lineStart + match[0].split('\n').length - 1;

    tokens.push({
      kind: 'STATUS_DEF',
      key: match.groups?.key ?? '',
      value: resolveEscapes(match.groups?.quotedValue ?? match.groups?.rawValue ?? ''),
      index: match.index,
      lineStart,
      lineEnd,
      color: match.groups?.color,
      colorLabel: resolveEscapes<undefined>(match.groups?.quotedLabelColor ?? match.groups?.rawLabelColor),
    } satisfies StatusDefToken);
  }
};

export default statusDefMatches;
