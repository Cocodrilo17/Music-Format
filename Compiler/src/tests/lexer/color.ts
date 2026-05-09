import { describe, it, expect } from 'vitest';
import tokenize from '../../compiler/lexer.ts';
import type { ColorDefToken } from '../../compiler/types.ts';

export function registerColorTests() {
  describe('color definition', () => {
    it('should tokenize a simple color definition', () => {
      const tokens = tokenize('color #fff = "white"');
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'COLOR_DEF',
        index: 0,
        color: '#fff',
        value: 'white',
        lineStart: 1,
        lineEnd: 1,
      });
    });

    it('should tokenize a spaced color definition', () => {
      const tokens = tokenize(`color
      #fff = 
      "white"
      
      color #123456 
      = "gray-blue" `);

      expect(tokens).toHaveLength(2);
      expect(tokens[0]).toMatchObject({
        kind: 'COLOR_DEF',
        color: '#fff',
        value: 'white',
        lineStart: 1,
        lineEnd: 3,
      });
      expect(tokens[1]).toMatchObject({
        kind: 'COLOR_DEF',
        color: '#123456',
        value: 'gray-blue',
        lineStart: 5,
        lineEnd: 6,
      });
    });

    it('should not tokenize a color with not lengths of 3 or 6', () => {
      const tokens = tokenize(`color
      #fffa = 
      "white"
      
      color #123456d 
      = "gray-blue"

      color #a456d 
      = "gray-blue"
      
      color #12 = "gray-blue"`);

      expect(tokens).toHaveLength(0);
    });

    it('should tokenize a escaped string value', () => {
      const tokens = tokenize('color #faf = "\\"Pink\\""') as ColorDefToken[];

      expect(tokens[0]?.value).toBe('"Pink"');
    });
  });
}
