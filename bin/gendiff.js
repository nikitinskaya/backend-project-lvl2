#!/usr/bin/env node

import commander from 'commander';
import gendiff from '../src/index.js';

const { program } = commander;

program
  .version('0.0.1', '-v, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstFile> <secondFile>')
  .action((file1, file2) => {
    gendiff(file1, file2);
  });
program.parse(process.argv);
