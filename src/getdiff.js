import _ from 'lodash';

const diffTypes = {
  added: 'added',
  removed: 'removed',
  equal: 'equal',
  changed: 'changed',
};

const getAllKeys = (obj1, obj2) => _.union(Object.keys(obj1), Object.keys(obj2)).sort();

const getDiffString = (symbol, key, value) => `${symbol} ${key}: ${value}`;

const printdiff = (diffObj) => {
  const diffText = diffObj.flatMap((item) => {
    const {
      key, type, newValue, oldValue,
    } = item;
    switch (type) {
      case diffTypes.added: {
        return getDiffString('+', key, newValue);
      }
      case diffTypes.removed: {
        return getDiffString('-', key, oldValue);
      }
      case diffTypes.equal: {
        return getDiffString(' ', key, oldValue);
      }
      case diffTypes.changed: {
        return [getDiffString('-', key, oldValue), getDiffString('+', key, newValue)];
      }
      default: {
        throw new Error(`Unexpected value of property 'type': '${type}'!`);
      }
    }
  });
  return diffText.join('\n');
};

const getdiff = (obj1, obj2) => {
  const keys = getAllKeys(obj1, obj2);
  const result = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, type: diffTypes.added, newValue: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { key, type: diffTypes.removed, oldValue: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return {
        key, type: diffTypes.equal, oldValue: obj1[key],
      };
    }
    return {
      key, type: diffTypes.changed, newValue: obj2[key], oldValue: obj1[key],
    };
  });

  return printdiff(result);
};

export default getdiff;
