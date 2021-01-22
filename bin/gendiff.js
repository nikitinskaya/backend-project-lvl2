#!/usr/bin/env node

import commander from 'commander';
import gendiff from '../src/index.js';

const { program } = commander;

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    gendiff(filepath1, filepath2);
  });
program.parse(process.argv);
