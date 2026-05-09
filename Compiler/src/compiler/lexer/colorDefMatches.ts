import type { ColorDefToken, MatchingFn } from '../types.ts';

const colorDefMatches: MatchingFn = (tokens, fileText, matchingRegex, getLine, resolveEscapes) => {
  // color #fff = "white"
  const colorDefMatches = fileText.matchAll(matchingRegex);
  for (const match of colorDefMatches) {
    const lineStart = getLine(match.index);
    const lineEnd = lineStart + match[0].split('\n').length - 1;

    tokens.push({
      kind: 'COLOR_DEF',
      lineStart,
      lineEnd,
      index: match.index,
      color: match[1] ?? '',
      value: resolveEscapes(match[3] ?? match[4] ?? ''),
    } satisfies ColorDefToken);
  }
};

export default colorDefMatches;
