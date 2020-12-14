const { read, memoize, readLines } = require("../util");

const DEBUG = false;

async function run() {
  const file = await read("Day 12/input.txt");

  const lines = file.split("\n");

  const num = part2(lines);

  console.log(`Value at end of program: ${num}`);
}

function part1(lines) {
  this.x = 0;
  this.y = 0;
  this.facing = 90;

  const commands = {
    N: (value) => (this.x += value),
    S: (value) => (this.x -= value),
    E: (value) => (this.y += value),
    W: (value) => (this.y -= value),
    L: (value) => (this.facing = (this.facing - value + 360) % 360),
    R: (value) => (this.facing = (this.facing + value + 360) % 360),
    F: (value) => {
      if (this.facing === 0) {
        commands.N(value);
      } else if (this.facing === 90) {
        commands.E(value);
      } else if (this.facing === 180) {
        commands.S(value);
      } else if (this.facing === 270) {
        commands.W(value);
      } else {
        throw "Invalid Facing!";
      }
    },
  };

  function runLine(line) {
    const instruction = line.slice(0, 1);
    const value = parseInt(line.slice(1), 10);
    commands[instruction](value);
  }

  lines.forEach(runLine);

  return Math.abs(x) + Math.abs(y);
}

/*
         N 0 (x pos)
W 270 (y neg)  E 90 (y pos)
        S 180 (x neg)
*/

function part2(lines) {
  this.x = 0;
  this.y = 0;
  this.wX = 1;
  this.wY = 10;

  const commands = {
    N: (value) => (this.wX += value),
    S: (value) => (this.wX -= value),
    E: (value) => (this.wY += value),
    W: (value) => (this.wY -= value),
    L: (value) => {
      value = (value + 360) % 360;
      let temp = this.wX;
      if (value === 90) {
        this.wX = this.wY;
        this.wY = -temp;
      } else if (value === 180) {
        this.wX = -this.wX;
        this.wY = -this.wY;
      } else {
        this.wX = -this.wY;
        this.wY = temp;
      }
    },
    R: (value) => commands.L(-value),
    F: (value) => {
      this.x += this.wX * value;
      this.y += this.wY * value;
    },
  };

  function runLine(line) {
    const instruction = line.slice(0, 1);
    const value = parseInt(line.slice(1), 10);
    commands[instruction](value);
  }

  lines.forEach(runLine);

  return Math.abs(x) + Math.abs(y);
}

run();
