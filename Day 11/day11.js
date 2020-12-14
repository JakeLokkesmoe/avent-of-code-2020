const { read, memoize } = require("../util");

const DEBUG = false;

async function run() {
  const file = await read("Day 11/input.txt");

  const lines = file.split("\n");

  const num = part1(lines);

  console.log(`Value at end of program: ${num}`);
}

function part1(lines) {
  let grid = lines.map((l) => l.split(""));
  let newGrid = null;
  let i = 1;

  while ((newGrid = SeatMapper(grid, i++)) != null) {
    grid = newGrid;
  }

  return grid.reduce(
    (a, b) => a + b.reduce((c, d) => (d === OCCUPIED ? c + 1 : c), 0),
    0
  );
}

const OCCUPIED = "#",
  OPEN = "L",
  FLOOR = ".";

function SeatMapper(grid, iter) {
  const maxX = grid.length;
  const maxY = grid[0].length;

  function isOccupied(x, y) {
    if (x < 0 || x >= maxX || y < 0 || y >= maxY) return false;
    return grid[x][y] === OCCUPIED;
  }

  function isOpenSeat(x, y) {
    if (x < 0 || x >= maxX || y < 0 || y >= maxY) return false;
    return grid[x][y] === OPEN;
  }

  function castRay(x, y, deltaX, deltaY) {
    do {
      x += deltaX;
      y += deltaY;
      if (isOccupied(x, y)) {
        return true;
      } else if (isOpenSeat(x, y)) {
        return false;
      }
    } while (x >= 0 && x < maxX && y >= 0 && y < maxY);
    return false;
  }

  function checkSeat(x, y) {
    let neighboringOcc = 0;

    if (castRay(x, y, -1, -1)) neighboringOcc++;
    if (castRay(x, y, -1, 0)) neighboringOcc++;
    if (castRay(x, y, -1, 1)) neighboringOcc++;
    if (castRay(x, y, 0, -1)) neighboringOcc++;
    if (castRay(x, y, 0, 1)) neighboringOcc++;
    if (castRay(x, y, 1, -1)) neighboringOcc++;
    if (castRay(x, y, 1, 0)) neighboringOcc++;
    if (castRay(x, y, 1, +1)) neighboringOcc++;

    if (isOpenSeat(x, y)) {
      return neighboringOcc === 0 ? OCCUPIED : OPEN;
    } else if (isOccupied(x, y)) {
      return neighboringOcc >= 5 ? OPEN : OCCUPIED;
    } else {
      return FLOOR;
    }
  }

  console.log(`Iteration ${iter}`);
  if (DEBUG) {
    console.log(`${grid.map((l) => l.join("")).join("\n")}\n\n`);
  }
  let newGrid = grid.map((row, x) => row.map((_, y) => checkSeat(x, y)));

  for (let x = 0; x < maxX; x++) {
    for (let y = 0; y < maxY; y++) {
      if (grid[x][y] !== newGrid[x][y]) {
        return newGrid;
      }
    }
  }

  return null;
}

run();
