import { describe } from 'vitest';
import { registerColorTests } from './lexer/color.ts';
import { registerStatusTests } from './lexer/status.ts';
import { registerEnumTests } from './lexer/enum.ts';
import { registerTagTests } from './lexer/tag.ts';

describe('Lexer', () => {
  registerColorTests();
  registerStatusTests();
  registerEnumTests();
  registerTagTests();
});
