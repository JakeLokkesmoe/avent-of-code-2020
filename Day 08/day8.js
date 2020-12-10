const read = require("../util").read;

async function run() {
  const file = await read("Day 08/input.txt");

  const lines = file.split("\n");

  const num = part2(lines);

  console.log(`Acc value at end of program: ${num}`);
}

function executeProgram(lines) {
  const linesExecuted = {};
  let lineNum = 0;
  let acc = 0;

  do {
    linesExecuted[lineNum] = true;
    const [instruction, valueStr] = lines[lineNum].split(" ");
    const value = parseInt(valueStr, 10);

    switch (instruction) {
      case "acc":
        acc += value;
        lineNum += 1;
        break;
      case "jmp":
        lineNum += value;
        break;
      case "nop":
        lineNum += 1;
        break;
    }

    if (linesExecuted[lineNum]) {
      return "Infinite Loop!";
    }
  } while (lineNum < lines.length);

  return acc;
}

function part2(lines) {
  for (let i = 0; i < lines.length; i++) {
    let originalLine = lines[i];
    const [instruction, valueStr] = originalLine.split(" ");
    if (instruction === "acc") continue;
    if (instruction === "jmp") lines[i] = `nop ${valueStr}`;
    else lines[i] = `jmp ${valueStr}`;

    const res = executeProgram(lines);
    if (res !== "Infinite Loop!") {
      return res;
    }

    lines[i] = originalLine;
  }

  return "NO FIX FOUND";
}

run();
