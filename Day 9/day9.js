const read = require("../util").read;

async function run() {
  const file = await read("Day 9/input.txt");

  const lines = file.split("\n");

  const num = part2(lines);

  console.log(`Value at end of program: ${num}`);
}

function part1(lines) {
  const size = 25;

  const preamble = [];

  for (let i = 0; i < size; i++) {
    preamble.push(lines.shift());
  }

  while (lines.length > 0) {
    const n = lines.shift();
    let found = false;
    for (let i = 0; i < size && !found; i++) {
      const dif = `${n - preamble[i]}`;
      const index = preamble.indexOf(dif);
      if (index !== -1 && (index !== i || preamble.lastIndexOf(dif) !== i)) {
        found = true;
      }
    }

    if (!found) {
      return n;
    }

    preamble.push(n);
    preamble.shift();
  }

  return 0;
}

function part2(lines) {
  const target = 90433990;

  const range = [];
  let sum = 0;

  for (let i = 0; i < lines.length && sum !== target; i++) {
    const n = parseInt(lines[i], 10);
    range.push(n);
    sum += n;
    while (sum > target) {
      sum -= range.shift();
    }
  }

  const min = range.reduce((a, b) => (a < b ? a : b));
  const max = range.reduce((a, b) => (a > b ? a : b));
  return min + max;
}

run();
