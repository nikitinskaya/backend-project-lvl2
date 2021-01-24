import parse from './parsers.js';
import getdiff from './getdiff.js';
import getFormatter from './formatters/index.js';

const gendiff = (file1, file2, format = 'stylish') => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  const diffObj = getdiff(obj1, obj2);
  const formatter = getFormatter(format);
  return formatter(diffObj);
};

export default gendiff;
