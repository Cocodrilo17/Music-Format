#!/usr/bin/env node
/*
  installing:
    npm install
    npm build
    npm install -g .

  Uninstall: npm uninstall -g music-format-compiler

  Usage:
    mfc --help
    mfc <file.mf> [--out <dir>]
*/

import fs from 'fs';
import path from 'path';

// --- CLI ---

const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help')) {
  console.log(`
  Usage: mfc <file.mf> [--out <dir>]
  
  Options:
    --out <dir>   Out directory (default: ./out)
    --help        Shows this help
  `);
  process.exit(0);
}

const inputFile = args[0];
const outIdx = args.indexOf('--out');
const outputDir = outIdx !== -1 ? args[outIdx + 1] : path.join(process.cwd(), 'out');

if (!fs.existsSync(inputFile ?? '')) {
  console.error(`\nThe input file "${inputFile}" was not founded\n`);
  process.exit(1);
}
