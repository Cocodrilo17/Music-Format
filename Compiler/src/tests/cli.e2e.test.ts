import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';

const BINARY = path.resolve('dist/index.js');

function run(args: string, cwd?: string): {
  stdout: string;
  stderr: string;
  code: number,
} {
  try {
    const stdout = execSync(`node ${BINARY} ${args}`, {
      encoding: 'utf-8',
      cwd: cwd ?? process.cwd()
    });
    return { stdout, stderr: '', code: 0 };
  }
  catch (error: any) {
    return {
      stdout: error.stdout ?? '',
      stderr: error.stderr ?? '',
      code: error.status ?? 1
    };
  }
}

describe('CLI End to End', () => {

  describe('--help', () => {
    it('should show the help text with --help', () => {
      const { stdout, code } = run('--help');
      expect(code).toBe(0);
      expect(stdout).toContain('--out');
    });

    it('should show the help text when there are no arguments', () => {
      const { code } = run('');
      expect(code).toBe(0);
    });
  });
});
