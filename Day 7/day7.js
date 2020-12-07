const read = require("../util").read;

async function run() {
  const file = await read("Day 7/input.txt");

  const rules = file.split("\n");

  const num = part2(rules);

  console.log(`Number of bags: ${num}`);
}

function part1(rules) {
  const targets = ["shiny gold"];
  let startCount;

  do {
    startCount = targets.length;
    for (let i = 0; i < rules.length; i++) {
      const [container, contents] = rules[i].split(" bags contain ");
      if (targets.indexOf(container) !== -1) continue;
      for (let t = 0; t < targets.length; t++) {
        if (contents.indexOf(targets[t]) !== -1) {
          targets.push(container);
          break;
        }
      }
    }
  } while (targets.length !== startCount);

  return targets.length - 1;
}

function part2(rules) {
  const set = rules
    .map((rule) => {
      const [container, contents] = rule.split(" bags contain ");
      const list = contents
        .split(", ")
        .map((l) => l.match(/(\d+) ([\w\s]+) bag.*/))
        .filter(Boolean)
        .map(([_, count, bag]) => [parseInt(count, 10), bag]);
      return [container, list];
    })
    .reduce((acc, [bag, contents]) => {
      acc[bag] = contents;
      return acc;
    }, {});

  return countBagContents(set, "shiny gold");
}

function countBagContents(rules, bag) {
  if (!rules[bag] || rules[bag].length === 0) {
    return 0;
  }
  return rules[bag]
    .map(([count, b]) => {
      return count * (countBagContents(rules, b) + 1);
    })
    .reduce((a, b) => a + b);
}

run();
