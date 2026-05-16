import type { BlockMatchingFn, TagGroupToken } from '../types.ts';

const tagGroupMatches: BlockMatchingFn = (tokens, fileText, matchingRegex, getLine, resolveEscapes) => {
  /*
  tag Clasica [
    barroco      => "Bach, Henry Purcell";
    romanticismo => "Bethoven, Chopin";
    clasicismo   => Mozart;
  ]
  */
  const matches = fileText.matchAll(matchingRegex.COMPLETE);
  for (const match of matches) {
    const lineStart = getLine(match.index);
    const lineEnd = lineStart + match[0].split('\n').length - 1;

    const raw: Array<{key: string, value: string | undefined}> = [];
    const block = match.groups?.array ?? '';
    for (const entry of block.matchAll(matchingRegex.ENTRY)) {
      raw.push({
        key: entry.groups?.key ?? '',
        value: resolveEscapes<undefined>(entry.groups?.quotedValue ?? entry.groups?.rawValue)
      });
    }

    tokens.push({
      kind: 'TAG_GROUP',
      lineStart,
      lineEnd,
      index: match.index,
      group: match.groups?.group ?? '',
      raw
    } satisfies TagGroupToken);
  }
};

export default tagGroupMatches;
