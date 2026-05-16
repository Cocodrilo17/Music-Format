import { describe, it, expect } from 'vitest';
import type { StatusColorToken } from '../../compiler/types.ts';
import tokenize from '../../compiler/lexer.ts';

export function registerStatusColorTests() {
  describe('Status Color Modification', () => {
    it('should tokenize a simple status color assignment', () => {
      const tokens = tokenize('#fff status');
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'STATUS_COLOR',
        lineStart: 1,
        lineEnd: 1,
        index: 0,
        identifier: 'status',
        newColor: '#fff',
      } satisfies StatusColorToken);
    });

    it('should tokenize a multiline definition', () => {
      const tokens = tokenize(`#fff
      status`);
      expect(tokens).toHaveLength(1);
      expect(tokens[0]).toMatchObject({
        kind: 'STATUS_COLOR',
        lineStart: 1,
        lineEnd: 2,
        index: 0,
        identifier: 'status',
        newColor: '#fff',
      } satisfies StatusColorToken);
    });

    it('should not tokenize an invalid color length', () => {
      const tokens = tokenize(`
      #fffa status
      #0f0ed status2
      #34 status3`);
      expect(tokens).toHaveLength(0);
    });
  });
}
