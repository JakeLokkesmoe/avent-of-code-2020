const readLines = require("../util");

async function run() {
  const lines = await readLines("Day 3/input.txt");

  const map = lines.map((l) => l.split(""));

  let trees = 1;

  trees *= part1(map, 1, 1);
  trees *= part1(map, 3, 1);
  trees *= part1(map, 5, 1);
  trees *= part1(map, 7, 1);
  trees *= part1(map, 1, 2);

  console.log(`Hit ${trees} trees`);
}

function part1(map, x_slope, y_slope) {
  const max_x = map[0].length,
    max_y = map.length;

  let trees = 0;

  for (let x = 0, y = 0; y < max_y; y += y_slope) {
    if (map[y][x] === "#") {
      trees++;
    }
    x = (x + x_slope) % max_x;
  }

  return trees;
}

run();
