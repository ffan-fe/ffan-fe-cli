import fs from 'fs';

const writeFile = (file, contents) => new Promise((resolve, reject) => {
  fs.writeFile(file, contents, 'utf8', err => err ? reject(err) : resolve());
});

const readFile = (file) => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf8', err => err ? reject(err) : resolve());
});

const readJsonSync = file => {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};

export default {writeFile, readFile, readJsonSync};
