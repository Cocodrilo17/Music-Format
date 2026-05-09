import tokenize from '../../compiler/lexer.ts';
import type { StatusDefToken } from '../../compiler/types.ts';
import { describe, it, expect } from 'vitest';

export function registerStatusTests() {
  describe('status definition', () => {
    it('should tokenize a simple status', () => {
      const tokens = tokenize('status v = founded');
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'STATUS_DEF',
        key: 'v',
        value: 'founded',
        lineStart: 1,
        lineEnd: 1,
        color: undefined,
        colorLabel: undefined,
      });
    });

    it('should tokenize a more spaced status', () => {
      const tokens = tokenize(`status
        v
        =
        "not founded"`);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'STATUS_DEF',
        key: 'v',
        value: 'not founded',
        lineStart: 1,
        lineEnd: 4,
        color: undefined,
        colorLabel: undefined,
      });
    });

    it('should tokenize a colorized status', () => {
      const tokens = tokenize(`status#fff
      v = "favorite"`);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'STATUS_DEF',
        key: 'v',
        value: 'favorite',
        lineStart: 1,
        lineEnd: 2,
        color: '#fff',
        colorLabel: undefined,
      });
    });

    it('should tokenize a colorized and label status', () => {
      const tokens = tokenize(`status#fff
      v = "favorite" <- "white"`);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'STATUS_DEF',
        key: 'v',
        value: 'favorite',
        lineStart: 1,
        lineEnd: 2,
        color: '#fff',
        colorLabel: 'white',
      });
    });

    it('should not tokenize a not 3 and 6 length hex colors', () => {
      const tokens = tokenize(`status#12
      v = "favorite" <- "white"
      
      status#12345 g = status
      
      status#1234567 h = status2`);
      expect(tokens).toHaveLength(0);
    });

    it('should tokenize a escaped string values', () => {
      const tokens = tokenize(
        'status v = "\\"Favorite\\"" <- "red \\"blood\\""'
      ) as StatusDefToken[];
      expect(tokens[0]?.value).toBe('"Favorite"');
      expect(tokens[0]?.colorLabel).toBe('red "blood"');
    });
  });
}
