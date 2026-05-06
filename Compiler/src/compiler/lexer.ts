import type { Token, StatusDefToken } from './types.js';

const TokenRegex = Object.freeze({
  STATUS_DEF:
    /status(#(?:[a-fA-F\d]{6}|[a-fA-F\d]{3}))?\s+([\wáéíóúü]+)\s*=\s*(?:(['"])((?:\\.|.)*?)\3|([\w áéíóúü\d]+))(?:\s*<-\s*(?:(['"])((?:\\.|.)*?)\6|([\w áéíóúü\d]+)))?/gms,
});

export default function tokenize(fileText: string): Token[] {
  const tokens: Token[] = [];

  const lineOffsets = [0];
  for (let i = 0; i < fileText.length; i++) {
    if (fileText[i] === '\n') lineOffsets.push(i + 1);
  }

  // Binary Search
  function getLine(index: number): number {
    let low = 0;
    let high = lineOffsets.length - 1;
    while (low < high) {
      const mid = (low + high + 1) >> 1;
      if ((lineOffsets[mid] ?? 0) <= index) low = mid;
      else high = mid - 1;
    }
    return low + 1;
  }

  // status#ffffff v = founded <- "white"
  const statusDefMatches = fileText.matchAll(TokenRegex.STATUS_DEF);
  for (const match of statusDefMatches) {

    const lineStart = getLine(match.index);
    const lineEnd = getLine(match.index) + match[0].split('\n').length - 1;

    tokens.push({
      kind: 'STATUS_DEF',
      key: match[2] ?? '',
      value: match[4] ?? match[5] ?? '',
      index: match.index,
      lineStart,
      lineEnd,
      color: match[1],
      colorLabel: match[8] ?? match[7]
    } satisfies StatusDefToken);
  }

  return tokens;
}
