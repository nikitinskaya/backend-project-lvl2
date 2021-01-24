import _ from 'lodash';
import diffTypes from '../common.js';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const printPlain = (data, ancestry = '') => data.map((item) => {
  const {
    key, type, children, newValue, oldValue,
  } = item;
  const currentKey = ancestry === '' ? key : `${ancestry}.${key}`;
  switch (type) {
    case diffTypes.nested: {
      return printPlain(children, currentKey);
    }
    case diffTypes.removed: {
      return `Property '${currentKey}' was deleted`;
    }
    case diffTypes.added: {
      const currValue = getValue(newValue);
      return `Property '${currentKey}' was added with value: ${currValue}`;
    }
    case diffTypes.changed: {
      const currNewValue = getValue(newValue);
      const currOldValue = getValue(oldValue);
      return `Property '${currentKey}' was changed from ${currOldValue} to ${currNewValue}`;
    }
    case diffTypes.equal: {
      return `Property '${currentKey}' was not changed`;
    }
    default: {
      throw new Error(`ERROR! Unexpected value of property 'type': '${type}'!`);
    }
  }
}).join('\n');

export default (diffObj) => printPlain(diffObj);
