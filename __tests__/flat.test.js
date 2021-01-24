import fs from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index';

const cases = [
  ['.json', 'plain'],
  ['.yml', 'plain'],
  ['.json', 'stylish'],
  ['.yml', 'stylish'],
];

const getFilePath = (name, ext = '.json') => `__tests__/__fixtures__/${name}${ext}`;

test.each(cases)('%j, %j', (ext, format) => {
  const file1 = getFilePath('file1', ext);
  const file2 = getFilePath('file2', ext);
  const diff = gendiff(file1, file2, format);
  const expected = fs.readFileSync(getFilePath(`expected-${format}`, '.txt'), 'utf-8');
  expect(diff).toEqual(expected);
});
