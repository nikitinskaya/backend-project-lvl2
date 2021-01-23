import fs from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index';

const extensions = ['.json', '.yml'];

const getFilePath = (name, ext = '.json') => `__tests__/__fixtures__/${name}${ext}`;

test.each(extensions)('Plaintext flat', (ext) => {
  const file1 = getFilePath('flat1', ext);
  const file2 = getFilePath('flat2', ext);
  const diff = gendiff(file1, file2);
  const expected = fs.readFileSync(getFilePath('expected', '.txt'), 'utf-8');
  expect(diff).toEqual(expected);
});
