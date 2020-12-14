const { readLines } = require("../util");

async function run() {
  const lines = await readLines("Day 13/input.txt");

  const num = part2(lines);

  console.log(`Value at end of program: ${num}`);
}

function part1(lines) {
  const start = parseInt(lines[0], 10);
  const nextBus = lines[1]
    .split(",")
    .filter((b) => b !== "x")
    .map((b) => parseInt(b, 10))
    .map((b) => ({ id: b, in: b - (start % b) }))
    .reduce((min, bus) => (bus.in < min.in ? bus : min));

  return nextBus.id * nextBus.in;
}

function part2(lines) {
  let busses = lines[1]
    .split(",")
    .map((n, i) => {
      if (n === "x") return false;
      n = parseInt(n, 10);
      return [n - (i % n), n];
    })
    .filter(Boolean);

  function expmod(base, exp, mod) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
      return Math.pow(expmod(base, exp / 2, mod), 2) % mod;
    } else {
      return (base * expmod(base, exp - 1, mod)) % mod;
    }
  }

  let max = 1;
  busses.forEach(([_, n]) => {
    max *= n;
  });

  let total = 0;
  busses.forEach(([a, n]) => {
    const y = max / n;
    total += a * y * expmod(y, n - 2, n);
    total %= max;
  });

  return total;
}

run();
