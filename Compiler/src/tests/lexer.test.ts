import { describe } from 'vitest';
import { registerColorTests } from './lexer/color.ts';
import { registerStatusTests } from './lexer/status.ts';

describe('Lexer', () => {
  registerColorTests();
  registerStatusTests();
});
