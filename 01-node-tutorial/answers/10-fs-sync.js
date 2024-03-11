const { readFileSync, writeFileSync } = require('fs');

console.log('start');

writeFileSync(
  './temporary/fileA.txt',
  `\nLine1 \nLine2 \nLine3`,
  { flag: 'a' } //a - append to the end of a file, w will rewrite
)
const result = readFileSync('./temporary/fileA.txt', 'utf8');
console.log(result);