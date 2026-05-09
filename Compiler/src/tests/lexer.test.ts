import { describe, it, expect } from 'vitest';
import tokenize from '../compiler/lexer.js';

describe('Lexer', () => {
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
  });

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
  });
});
