import type { BaseMatchingFn, EnumToken, EnumKinds } from '../types.ts';

const enumMatches: BaseMatchingFn = (tokens, fileText, matchingRegex, getLine) => {
  // enum 0:
  const enumMatches = fileText.matchAll(matchingRegex);
  for (const match of enumMatches) {
    const lineStart = getLine(match.index);
    const lineEnd = lineStart + match[0].split('\n').length - 1;

    tokens.push({
      kind: 'ENUM',
      lineStart,
      lineEnd,
      index: match.index,
      mode: match[2] ? match[2]?.toLowerCase() as EnumKinds : 'name',
    } satisfies EnumToken);
  }
};

export default enumMatches;
