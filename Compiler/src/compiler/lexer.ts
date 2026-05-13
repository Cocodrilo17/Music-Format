import type { Token } from './types.ts';
import { ENUM_MODES } from './types.ts';
import statusDefMatches from './lexer/statusDefMatches.ts';
import colorDefMatches from './lexer/colorDefMatches.ts';
import enumMatches from './lexer/enumMatches.ts';
import tagDefMatches from './lexer/tagDefMatches.ts';

const TokenRegex = Object.freeze({
  STATUS_DEF:
    /status(?<color>#(?:[a-fA-F\d]{6}|[a-fA-F\d]{3}))?\s+(?<key>[\wáéíóúü]+)\s*=\s*(?:(?<q1>['"])(?<quotedValue>(?:\\.|.)*?)\k<q1>|(?<rawValue>[\w áéíóúü\d]+))(?:\s*<-\s*(?:(['"])(?<quotedLabelColor>(?:\\.|.)*?)\6|(?<rawLabelColor>[\w áéíóúü\d]+)))?/gms,
  COLOR_DEF:
    /color\s+(?<color>#(?:[a-fA-F\d]{6}|[a-fA-F\d]{3}))\s+=\s+(?:(?<q1>['"])(?<quotedValue>(?:\\.|.)*?)\k<q1>|(?<rawValue>[\w áéíóúü\d]+))/gms,
  ENUM:
    new RegExp(`enum(\\s+(?<mode>(?i:${ENUM_MODES.join('|')})))?:`, 'gms'),
  TAG_DEF:
    /tag\s+(?<tag>[\wáéíóúü]+)\s*=\s*(?:(?<q1>['"])(?<quotedMetadata>(?:\\.|.)*?)\k<q1>|(?<rawMetadata>[\w áéíóúü\d]+))/gms
});

function resolveEscapes<T>(raw: string | T): string | T {
  if (typeof raw !== 'string') return raw;
  return raw.replace(/\\(.)/g, '$1');
}

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

  // Modifying "tokens" by reference
  statusDefMatches(tokens, fileText, TokenRegex.STATUS_DEF, getLine, resolveEscapes);
  colorDefMatches(tokens, fileText, TokenRegex.COLOR_DEF, getLine, resolveEscapes);
  enumMatches(tokens, fileText, TokenRegex.ENUM, getLine);
  tagDefMatches(tokens, fileText, TokenRegex.TAG_DEF, getLine, resolveEscapes);

  return tokens.sort((a, b) => a.index - b.index);
}
