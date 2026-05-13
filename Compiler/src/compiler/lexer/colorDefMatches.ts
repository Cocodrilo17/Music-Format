import type { ColorDefToken, DefsMatchingFn } from '../types.ts';

const colorDefMatches: DefsMatchingFn = (tokens, fileText, matchingRegex, getLine, resolveEscapes) => {
  // color #fff = "white"
  const colorMatches = fileText.matchAll(matchingRegex);
  for (const match of colorMatches) {
    const lineStart = getLine(match.index);
    const lineEnd = lineStart + match[0].split('\n').length - 1;

    tokens.push({
      kind: 'COLOR_DEF',
      lineStart,
      lineEnd,
      index: match.index,
      color: match.groups?.color ?? '',
      value: resolveEscapes(match.groups?.quotedValue ?? match.groups?.rawValue ?? ''),
    } satisfies ColorDefToken);
  }
};

export default colorDefMatches;
