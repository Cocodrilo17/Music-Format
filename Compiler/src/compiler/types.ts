// --- Lexer ---

// Matching functions
type BaseMatchingFnArgs = [
  tokens: Token[],
  fileText: string,
  matchingRegex: RegExp,
  getLine: (index: number) => number,
];

export type BaseMatchingFn = (...args: BaseMatchingFnArgs) => void;
export type DefsMatchingFn = (...args: [...BaseMatchingFnArgs, resolveEscapes: <T>(raw: string | T) => string | T]) => void;

// tokens
export const TokenKind = Object.freeze({
  STATUS_DEF: 'STATUS_DEF',
  COLOR_DEF: 'COLOR_DEF',
  ENUM: 'ENUM'
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

export const EnumKinds = Object.freeze([
  '0',
  '0r',
  'a',
  'ar',
  'i',
  'ir',
  'name',
  'author',
  'status',
  'comment',
  'tag',
  'link',
  'color'
] as const);

export type EnumKinds = typeof EnumKinds[number];

export interface EnumToken extends BaseToken {
  kind: 'ENUM',
  mode: EnumKinds
}

export type Token =
  | StatusDefToken
  | ColorDefToken
  | EnumToken;
