const { readFileSync, writeFileSync } = require('fs');

console.log('start');
const first = readFileSync('../content/first.txt', 'utf8');
const second = readFileSync('../content/second.txt', 'utf8');

writeFileSync(
  './temporary/fileA.txt',
  `\nHere is the result : ${first}, ${second}`,
  { flag: 'a' } //a - append to the end of a file, w will rewrite
)
const result = readFileSync('./temporary/fileA.txt', 'utf8');
console.log(result);

console.log('done with this task');
console.log('starting the next one');
