const fs = require("fs");

function readLines(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.split("\n"));
    });
  });
}

function read(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

function memoize(f) {
  const cacheLookup = {}; // Value cache stored in the closure
  return function () {
    const key = Array.prototype.join.call(arguments, "-");
    if (key in cacheLookup) {
      return cacheLookup[key];
    } else {
      return (cacheLookup[key] = f.apply(this, arguments));
    }
  };
}

module.exports = { readLines, read, memoize };
