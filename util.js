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

module.exports = { readLines, read };
