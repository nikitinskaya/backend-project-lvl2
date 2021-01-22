import fs from 'fs';
import getdiff from './getdiff.js';

const parse = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf-8'));

const gendiff = (file1, file2) => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  const diff = getdiff(obj1, obj2);

  console.log(diff);
};

export default gendiff;
