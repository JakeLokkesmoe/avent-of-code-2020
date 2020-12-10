const { read, memoize } = require("../util");

async function run() {
  const file = await read("Day 10/input.txt");

  const lines = file.split("\n");

  const num = part2(lines);

  console.log(`Value at end of program: ${num}`);
}

const buildSortedLines = (l) => {
  l = l.map((l) => parseInt(l, 10)).sort((a, b) => a - b);
  return [0, ...l, l[l.length - 1] + 3];
};

function part1(lines) {
  lines = buildSortedLines(lines);

  const counts = {};

  for (let i = 0; i < lines.length - 1; i++) {
    const diff = lines[i + 1] - lines[i];
    counts[diff] = (counts[diff] || 0) + 1;
  }

  return counts[1] * counts[3];
}

function part2(lines) {
  lines = buildSortedLines(lines);

  const canRemoveBetweenRecursive = memoize((base, target) => {
    if (lines[target] - lines[base] <= 3) {
      let acc = 1;
      for (let i = target - 1; i < lines.length - 2; i++) {
        acc += canRemoveBetweenRecursive(i === target - 1 ? base : i, i + 2);
      }
      return acc;
    }
    return 0;
  });

  let total = 1;

  for (let i = 0; i < lines.length - 2; i++) {
    total += canRemoveBetweenRecursive(i, i + 2);
  }

  return total;
}

run();
