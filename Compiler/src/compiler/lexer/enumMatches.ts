import type { BaseMatchingFn, EnumToken, EnumMode } from '../types.ts';

const enumMatches: BaseMatchingFn = (tokens, fileText, matchingRegex, getLine) => {
  // enum 0:
  const enumDefMatches = fileText.matchAll(matchingRegex);
  for (const match of enumDefMatches) {
    const lineStart = getLine(match.index);
    const lineEnd = lineStart + match[0].split('\n').length - 1;

    const rawMode = match.groups?.mode?.toLowerCase() as EnumMode | undefined;

    tokens.push({
      kind: 'ENUM',
      lineStart,
      lineEnd,
      index: match.index,
      mode: rawMode ?? 'name',
    } satisfies EnumToken);
  }
};

export default enumMatches;
