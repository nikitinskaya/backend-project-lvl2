import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

const parse = (filepath) => {
  const ext = path.extname(filepath);
  const data = fs.readFileSync(filepath, 'utf-8');
  return parsers[ext](data);
};

export default parse;
