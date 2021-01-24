import stylish from './stylish.js';
import plain from './plain.js';

const formatter = {
  stylish,
  plain,
};

export default (format) => formatter[format];
