// --- Lexer ---

// Matching functions
type BaseMatchingFnArgs<R> = [
  tokens: Token[],
  fileText: string,
  matchingRegex: R,
  getLine: (index: number) => number,
];

type BlockRegex = {
  COMPLETE: RegExp,
  ENTRY: RegExp
}

export type BaseMatchingFn = (...args: BaseMatchingFnArgs<RegExp>) => void;
export type DefsMatchingFn = (...args: [...BaseMatchingFnArgs<RegExp>, resolveEscapes: <T>(raw: string | T) => string | T]) => void;
export type BlockMatchingFn = (...args: [...BaseMatchingFnArgs<BlockRegex>, resolveEscapes: <T>(raw: string | T) => string | T]) => void;

// tokens

export type TokenKind =
  'STATUS_DEF' |
  'COLOR_DEF'  |
  'ENUM'       |
  'TAG_DEF'    |
  'TAG_GROUP'  ;

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

export const ENUM_MODES = Object.freeze([
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

export type EnumMode = typeof ENUM_MODES[number];

export interface EnumToken extends BaseToken {
  kind: 'ENUM',
  mode: EnumMode
}

export interface TagDefToken extends BaseToken {
  kind: 'TAG_DEF';
  tag: string;
  metadata: string;
}

export interface TagGroupToken extends BaseToken {
  kind: 'TAG_GROUP';
  group: string;
  raw: {
    key: string;
    value: string | undefined;
  }[]
}

export type Token =
  | StatusDefToken
  | ColorDefToken
  | EnumToken
  | TagDefToken
  | TagGroupToken;
