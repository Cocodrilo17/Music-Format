import type { BaseMatchingFn, StatusColorToken } from '../types.ts';

const statusColorMatches: BaseMatchingFn = (tokens, fileText, matchingRegex, getLine) => {
  // #fff status
  const matches = fileText.matchAll(matchingRegex);
  for (const match of matches) {
    const lineStart = getLine(match.index);
    const lineEnd = lineStart + match[0].split('\n').length - 1;

    tokens.push({
      kind: 'STATUS_COLOR',
      lineStart,
      lineEnd,
      index: match.index,
      identifier: match.groups?.identifier ?? '',
      newColor: match.groups?.color ?? ''
    } satisfies StatusColorToken);
  }
};

export default statusColorMatches;
