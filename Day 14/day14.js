const { readLines } = require("../util");

const DEBUG = false;

async function run() {
  const lines = await readLines("Day 14/input.txt");

  const num = part2(lines);

  console.log(`Value at end of program: ${num}`);
}

function part1(lines) {
  let mask;
  const mem = {};

  function applyMask(dec) {
    const bin = (dec >>> 0).toString(2).padStart(mask.length, "0");
    const res = mask
      .split("")
      .map((n, i) => (n === "X" ? bin[i] : n))
      .join("");
    return parseInt(res, 2);
  }

  lines.forEach((line) => {
    let [op, value] = line.split(" = ");
    if (op === "mask") {
      mask = value;
    } else {
      const addr = parseInt(op.slice(4, -1));
      mem[addr] = applyMask(parseInt(value));
    }
  });

  return Object.values(mem).reduce((a, b) => a + b);
}

function part2(lines) {
  let mask;
  const mem = {};

  function applyMask(addr, value) {
    const bin = (addr >>> 0).toString(2).padStart(mask.length, "0");
    let res = mask.split("").map((n, i) => (n === "0" ? bin[i] : n));

    const xs = res.reduce((acc, n, i) => {
      if (n === "X") acc.push(i);
      return acc;
    }, []);

    const max = Math.pow(2, xs.length);

    DEBUG && console.log(`${res.join("")} (count ${max})`);

    for (let i = 0; i < max; i++) {
      const floatValues = (i >>> 0).toString(2).padStart(xs.length, "0");
      for (let j = 0; j < xs.length; j++) {
        res[xs[j]] = floatValues[j];
      }
      let address = res.join("");
      DEBUG &&
        console.log(
          `${`${i}`.padStart(4, "0")} - ${floatValues}: ${address} = ${value}`
        );
      mem[parseInt(address, 2)] = value;
    }
    DEBUG && console.log("");
  }

  lines.forEach((line) => {
    let [op, value] = line.split(" = ");
    if (op === "mask") {
      mask = value;
    } else {
      const addr = parseInt(op.slice(4, -1));
      applyMask(addr, parseInt(value));
    }
  });

  return Object.values(mem).reduce((a, b) => a + b);
}

run();
