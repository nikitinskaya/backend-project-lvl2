import parse from './parsers.js';
import getdiff from './getdiff.js';

const gendiff = (file1, file2) => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  return getdiff(obj1, obj2);
};

export default gendiff;
