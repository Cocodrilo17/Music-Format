import { describe, it, expect } from 'vitest';
import tokenize from '../../compiler/lexer.ts';
import type { TagDefToken } from '../../compiler/types.ts';

export function registerTagTests() {
  describe('Tag definitions', () => {
    it('should tokenize a simple tag', () => {
      const tokens = tokenize('tag rock = "the best rock song"');
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'TAG_DEF',
        lineStart: 1,
        lineEnd: 1,
        index: 0,
        tag: 'rock',
        metadata: 'the best rock song',
      } satisfies TagDefToken);
    });

    it('should tokenize a space tag', () => {
      const tokens = tokenize(`tag
      rock
      =
      
      "the best 
      rock song"`);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'TAG_DEF',
        lineStart: 1,
        lineEnd: 6,
        index: 0,
        tag: 'rock',
        metadata: `the best 
      rock song`,
      } satisfies TagDefToken);
    });

    it('should tokenize a tag with escaped values', () => {
      const tokens = tokenize('tag rock = "the \\"best\\" rock song"');
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'TAG_DEF',
        lineStart: 1,
        lineEnd: 1,
        index: 0,
        tag: 'rock',
        metadata: 'the "best" rock song',
      } satisfies TagDefToken);
    });
  });
}
