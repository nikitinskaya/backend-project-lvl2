import fs from 'fs';
import { test, expect } from '@jest/globals';
import gendiff from '../src/index';

const getFilePath = (name, ext = '.json') => `__tests__/__fixtures__/${name}${ext}`;

test('Plaintext flat', () => {
  const file1 = getFilePath('flat1');
  const file2 = getFilePath('flat2');
  const diff = gendiff(file1, file2);
  const expected = fs.readFileSync(getFilePath('expected', '.txt'), 'utf-8');
  expect(diff).toEqual(expected);
});
