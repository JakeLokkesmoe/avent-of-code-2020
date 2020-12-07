const read = require("../util").read;

async function run() {
  const file = await read("Day 5/input.txt");

  const seats = file.split("\n");

  const ids = seats.map(computeId);

  const sorted = ids.sort((a, b) => a - b);

  let num = 0;
  for (let i = 1; i < sorted.length - 1; i++) {
    if (sorted[i] + 1 !== sorted[i + 1]) {
      num = sorted[i] + 1;
      break;
    }
  }

  console.log(`Max id ${num}`);
}

function computeId(rule) {
  const rowRule = rule.slice(0, 7);
  const seatRule = rule.slice(7);

  const row = binarySearch(0, 127, 0, rowRule);
  const seat = binarySearch(0, 7, 0, seatRule);

  return row * 8 + seat;
}

function binarySearch(min, max, i, rule) {
  if (min === max) {
    return min;
  }
  const r = rule[i];
  if (r === "L" || r === "F") {
    return binarySearch(min, min + Math.floor((max - min) / 2), i + 1, rule);
  } else {
    return binarySearch(min + Math.ceil((max - min) / 2), max, i + 1, rule);
  }
}

run();
