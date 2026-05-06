// --- Lexer ---

export const TokenKind = Object.freeze({
  STATUS_DEF: 'STATUS_DEF'
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

export type Token =
  StatusDefToken;
