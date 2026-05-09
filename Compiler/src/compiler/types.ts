// --- Lexer ---

export type MatchingFn = (
  tokens: Token[],
  fileText: string,
  matchingRegex: RegExp,
  getLine: (index: number) => number,
  resolveEscapes: <T>(raw: string | T) => string | T
) => void;

export const TokenKind = Object.freeze({
  STATUS_DEF: 'STATUS_DEF',
  COLOR_DEF: 'COLOR_DEF'
} as const);

export type TokenKind = typeof TokenKind[keyof typeof TokenKind];

export interface BaseToken {
  kind: TokenKind;
  index: number;
  lineStart: number;
  lineEnd: number;
}

export interface StatusDefToken extends BaseToken {
  kind: 'STATUS_DEF';
  key: string;
  value: string;
  color?: string | undefined;
  colorLabel?: string | undefined;
}

export interface ColorDefToken extends BaseToken {
  kind: 'COLOR_DEF';
  color: string;
  value: string;
}

export type Token =
  StatusDefToken
  | ColorDefToken;
