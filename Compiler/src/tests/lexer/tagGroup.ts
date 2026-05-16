import { describe, it, expect } from 'vitest';
import tokenize from '../../compiler/lexer.ts';
import type { TagGroupToken } from '../../compiler/types.ts';

export function registerTagGroupTests() {
  describe('Tag groups', () => {
    it('should tokenize a simple tag group', () => {
      const tokens = tokenize(
        'tag Clasica[barroco=>"Bach, Henry Purcell";romanticismo=>"Liszt, Chopin";clasicismo=>"Mozart, Beethoven";]'
      );

      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'TAG_GROUP',
        lineStart: 1,
        lineEnd: 1,
        index: 0,
        group: 'Clasica',
        raw: [
          { key: 'barroco', value: 'Bach, Henry Purcell' },
          { key: 'romanticismo', value: 'Liszt, Chopin' },
          { key: 'clasicismo', value: 'Mozart, Beethoven' },
        ],
      } satisfies TagGroupToken);
    });

    it('should tokenize a more spaced tag group', () => {
      const tokens = tokenize(`
      tag Clasica [
        barroco      => "Bach, Henry Purcell";
        romanticismo => "Lizst, Chopin";
        clasicismo   => Mozart;
      ]`);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'TAG_GROUP',
        lineStart: 2,
        lineEnd: 6,
        index: 7,
        group: 'Clasica',
        raw: [
          { key: 'barroco', value: 'Bach, Henry Purcell' },
          { key: 'romanticismo', value: 'Lizst, Chopin' },
          { key: 'clasicismo', value: 'Mozart' },
        ],
      } satisfies TagGroupToken);
    });

    it('should tokenize tag group with elements without value', () => {
      const tokens = tokenize(`
      tag Clasica [
        barroco;
        romanticismo => "Liszt, Chopin";
        clasicismo;
      ]`);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'TAG_GROUP',
        lineStart: 2,
        lineEnd: 6,
        index: 7,
        group: 'Clasica',
        raw: [
          { key: 'barroco', value: undefined },
          { key: 'romanticismo', value: 'Liszt, Chopin' },
          { key: 'clasicismo', value: undefined },
        ],
      } satisfies TagGroupToken);
    });

    it('should tokenize a empty tag group', () => {
      const tokens = tokenize('tag Clasica []');
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'TAG_GROUP',
        lineStart: 1,
        lineEnd: 1,
        index: 0,
        group: 'Clasica',
        raw: []
      } satisfies TagGroupToken);
    });

    it('should not tokenize a bad syntax tag group', () => {
      const tokens = tokenize(`
      tag Clasica [
        barroco      => ;
        romanticismo => "Bethoven, Chopin";
        clasicismo   =>
      ]`);
      expect(tokens).toHaveLength(0);
    });

    it('should tokenize elements with escaped values', () => {
      const tokens = tokenize(`
      tag Clasica [
        barroco      => "\\"Bach\\", Henry Purcell";
        romanticismo => "\\'Beethoven\\', Chopin";
        clasicismo   => Mozart;
      ]`);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'TAG_GROUP',
        lineStart: 2,
        lineEnd: 6,
        index: 7,
        group: 'Clasica',
        raw: [
          { key: 'barroco', value: '"Bach", Henry Purcell' },
          { key: 'romanticismo', value: '\'Beethoven\', Chopin' },
          { key: 'clasicismo', value: 'Mozart' }
        ]
      } satisfies TagGroupToken);
    });
  });
}
