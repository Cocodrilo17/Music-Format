import { describe, it, expect } from 'vitest';
import tokenize from '../../compiler/lexer.ts';
import { ENUM_MODES, type EnumToken } from '../../compiler/types.ts';

export function registerEnumTests() {
  describe('enum directive', () => {
    it('should tokenize every types of enums', () => {
      const string = `
      enum 0:
      enum 0r:
      enum a:
      enum ar:
      enum i:
      enum ir:
      enum name:
      enum author:
      enum status:
      enum comment:
      enum tag:
      enum link:
      enum color:
      enum:
      `;

      const tokens = tokenize(string);

      const expectedArray: EnumToken[] = ENUM_MODES.map((mode, index) => {
        return {
          kind: 'ENUM',
          lineStart: index + 2,
          lineEnd: index + 2,
          index: string.indexOf(`enum ${mode}:`),
          mode,
        } satisfies EnumToken;
      });

      expectedArray.push({
        kind: 'ENUM',
        lineStart: 15,
        lineEnd: 15,
        mode: 'name',
        index: string.indexOf('enum:')
      } satisfies EnumToken);

      expect(tokens).toHaveLength(14);
      expect(tokens).toEqual(expectedArray);
    });

    it('should tokenize a spaced enum but not with a space before ":"', () => {
      const tokens = tokenize(`
      enum
      0:
      
      enum name
      :`);

      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'ENUM',
        lineStart: 2,
        lineEnd: 3,
        mode: '0',
        index: 7
      } satisfies EnumToken);
    });

    it('should not tokenize a enum with a unknown type', () => {
      const tokens = tokenize('enum statuses:');
      expect(tokens).toHaveLength(0);
    });

    it('should tokenize a enum no matter the lower or upper case', () => {
      const tokens = tokenize('enum I:');
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'ENUM',
        lineStart: 1,
        lineEnd: 1,
        mode: 'i',
        index: 0
      } satisfies EnumToken);
    });
  });
}
