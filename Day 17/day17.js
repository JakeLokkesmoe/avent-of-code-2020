const { read } = require("../util");

const DEBUG = false;

async function run() {
  const file = await read("Day 17/input.txt");

  const lines = file.split("\n");

  const num = part1(lines);

  console.log(`Value at end of program: ${num}`);
}

function part1(lines) {
  let grid = lines.map((l) => l.split(""));

  grid = grid.reduce((xa, xv, x) => {
    xa[x] = xv.reduce((ya, yv, y) => {
      ya[y] = { 0: { 0: yv } };
      return ya;
    }, {});
    return xa;
  }, {});

  const ITERS = 6;

  for (let i = 0; i < ITERS; i++) {
    grid = CubeMapper(grid, i);
  }

  return Object.values(grid).reduce(
    (a, b) =>
      a +
      Object.values(b).reduce(
        (c, d) =>
          c +
          Object.values(d).reduce(
            (e, f) =>
              e +
              Object.values(f).reduce((g, h) => (h === ACTIVE ? g + 1 : g), 0),
            0
          ),
        0
      ),
    0
  );
}

const ACTIVE = "#",
  INACTIVE = ".";

function CubeMapper(grid, iter) {
  const xValues = Object.keys(grid).map((n) => parseInt(n));
  const minX = xValues.reduce((a, b) => (a < b ? a : b)) - 1;
  const maxX = minX + xValues.length + 2;

  const yValues = Object.keys(grid[0]).map((n) => parseInt(n));
  const minY = yValues.reduce((a, b) => (a < b ? a : b)) - 1;
  const maxY = minY + yValues.length + 2;

  const zValues = Object.keys(grid[0][0]).map((n) => parseInt(n));
  const minZ = zValues.reduce((a, b) => (a < b ? a : b)) - 1;
  const maxZ = minZ + zValues.length + 2;

  const wValues = Object.keys(grid[0][0][0]).map((n) => parseInt(n));
  const minW = wValues.reduce((a, b) => (a < b ? a : b)) - 1;
  const maxW = minW + wValues.length + 2;

  function isActive(x, y, z, w) {
    return (
      grid[x] && grid[x][y] && grid[x][y][z] && grid[x][y][z][w] === ACTIVE
    );
  }

  function checkCube(x, y, z, w) {
    let neighboringActive = 0;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          for (let dw = -1; dw <= 1; dw++) {
            if (dx !== 0 || dy !== 0 || dz !== 0 || dw !== 0) {
              if (isActive(x + dx, y + dy, z + dz, w + dw)) {
                neighboringActive++;
              }
            }
          }
        }
      }
    }

    if (isActive(x, y, z, w)) {
      return neighboringActive === 2 || neighboringActive === 3
        ? ACTIVE
        : INACTIVE;
    } else {
      return neighboringActive === 3 ? ACTIVE : INACTIVE;
    }
  }

  console.log(`Iteration ${iter}`);

  const newGrid = {};

  for (let w = minW; w <= maxW; w++) {
    for (let z = minZ; z <= maxZ; z++) {
      for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
          newGrid[x] = newGrid[x] || {};
          newGrid[x][y] = newGrid[x][y] || {};
          newGrid[x][y][z] = newGrid[x][y][z] || {};
          newGrid[x][y][z][w] = checkCube(x, y, z, w);
        }
      }
    }
  }

  return newGrid;
}

run();
