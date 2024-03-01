const { writeFile } = require('fs');

const file = "./temporary/fileB.txt";
console.log('start');

const writeLine = (i) => {
  writeFile(file, `I am line ${i}.\n`, { flag: 'a' }, (err) => {
    if (err) {
      console.log(`Error writing line ${i}:`, err);
    } else {
      console.log(`Line ${i} written.`);
    }
  });
};

// Calls writeLine three times
writeLine(1);
writeLine(2);
writeLine(3);

// function calls are initiated (not necessarily completed)
console.log("Initiated writing lines asynchronously.");

/*
const writeLine = (line, callback) => {
  writeFile(file, line, { flag: 'a' }, callback);
};

const writeLinesToFileAsync = (i) => {
 const writeNext = () => {
    if (i > 0) {
      writeLine(`I am ${i} line.\n`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`Line ${i} written.`);
        i--; 
        writeNext(); 
      });
    } else {
      console.log("Done writing lines asynchronously.");
    }
  };

  writeNext(); // recursion
};

writeLinesToFileAsync(3);
*/