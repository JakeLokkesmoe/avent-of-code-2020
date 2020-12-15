const { read } = require("../util");

async function run() {
  const input = await read("Day 15/input.txt");

  const num = memoryGame(input, 30000000);

  console.log(`Value at end of program: ${num}`);
}

function memoryGame(input, end) {
  const numbers = input.split(",").map((n) => parseInt(n));
  const map = numbers.reduce((acc, n, i) => {
    if (i + 1 !== numbers.length) {
      acc[n] = i + 1;
    }
    return acc;
  }, {});

  let lastNum = numbers[numbers.length - 1];

  for (let turn = numbers.length + 1; turn <= end; turn++) {
    let nextNum = map[lastNum] != null ? turn - map[lastNum] - 1 : 0;
    map[lastNum] = turn - 1;
    lastNum = nextNum;
  }

  return lastNum;
}

run();
