import _ from 'lodash';
import diffTypes from '../common.js';

const getDiffString = (level, symbol, key, value) => {
  const pad = ' '.repeat(level);
  if (!_.isObject(value)) {
    return `${pad}${symbol} ${key}: ${value}`;
  }
  const childValue = Object.keys(value)
    .map((childKey) => getDiffString(level + 4, ' ', childKey, value[childKey]));
  return `${' '.repeat(level)}${symbol} ${key}: {\n${childValue}\n${' '.repeat(level + 2)}}`;
};

const printStylish = (diffObj, level = 0) => {
  const currentLevel = level + 2;
  const diffText = diffObj.map((item) => {
    const {
      key, type, newValue, oldValue, children,
    } = item;
    switch (type) {
      case diffTypes.added: {
        return getDiffString(currentLevel, '+', key, newValue);
      }
      case diffTypes.removed: {
        return getDiffString(currentLevel, '-', key, newValue);
      }
      case diffTypes.equal: {
        return getDiffString(currentLevel, ' ', key, newValue);
      }
      case diffTypes.changed: {
        const old = getDiffString(currentLevel, '-', key, oldValue);
        const next = getDiffString(currentLevel, '+', key, newValue);
        return `${old}\n${next}`;
      }
      case diffTypes.nested: {
        const childrenObj = printStylish(children, currentLevel + 2);
        return `${' '.repeat(currentLevel + 2)}${key}: {\n${childrenObj}\n${' '.repeat(currentLevel + 2)}}`;
      }
      default: {
        throw new Error(`Unexpected value of property 'type': '${type}'!`);
      }
    }
  });
  const result = diffText.join('\n');
  return result.replace(/, /gi, '\n ');
};

export default (diffObj) => `{\n${printStylish(diffObj)}\n}`;
