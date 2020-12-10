const read = require("../util").read;

async function run() {
  const file = await read("Day 06/input.txt");

  const groups = file.split("\n\n");

  const sum = groups.map(runGroup).reduce((a, b) => a + b, 0);

  console.log(`Sum is: ${sum}`);
}

function runGroup(group) {
  const num = group.split("\n").length;
  let letters = group.replace(/\s+/g, "").split("");

  letters = letters.reduce((l, c) => {
    l[c] = l[c] == null ? 1 : l[c] + 1;
    return l;
  }, {});

  return Object.values(letters).filter((c) => c === num).length;
}

run();
