import type { MatchingFn, StatusDefToken } from '../types.ts';

const statusDefMatches: MatchingFn = (tokens, fileText, matchingRegex, getLine, resolveEscapes) => {
  // status#ffffff v = founded <- "white"
  const statusDefMatches = fileText.matchAll(matchingRegex);
  for (const match of statusDefMatches) {
    const lineStart = getLine(match.index);
    const lineEnd = lineStart + match[0].split('\n').length - 1;

    tokens.push({
      kind: 'STATUS_DEF',
      key: match[2] ?? '',
      value: resolveEscapes(match[4] ?? match[5] ?? ''),
      index: match.index,
      lineStart,
      lineEnd,
      color: match[1],
      colorLabel: resolveEscapes<undefined>(match[7] ?? match[8]),
    } satisfies StatusDefToken);
  }
};

export default statusDefMatches;
