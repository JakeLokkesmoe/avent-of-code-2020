const { read } = require("../util");

async function run() {
  let input = await read("Day 16/input.txt");

  let [rules, yourTicket, nearbyTickets] = input.split("\n\n");

  rules = rules.split("\n").map((n) => {
    const [label, rule] = n.split(": ");
    let [range1, range2] = rule.split(" or ").map((range) => {
      const [min, max] = range.split("-").map((n) => parseInt(n));
      return {
        min,
        max,
      };
    });

    return {
      label,
      range1,
      range2,
    };
  });

  yourTicket = yourTicket
    .split("\n")[1]
    .split(",")
    .map((n) => parseInt(n));

  nearbyTickets = nearbyTickets
    .split("\n")
    .slice(1)
    .map((n) => n.split(",").map((m) => parseInt(m)));

  const num = part2(rules, yourTicket, nearbyTickets);

  console.log(`Value at end of program: ${num}`);
}

function matchesRule(value, rule) {
  return (
    (value >= rule.range1.min && value <= rule.range1.max) ||
    (value >= rule.range2.min && value <= rule.range2.max)
  );
}

function part1(rules, _, nearbyTickets) {
  let errorRate = 0;

  function matchesRule(value, rule) {
    return (
      (value >= rule.range1.min && value <= rule.range1.max) ||
      (value >= rule.range2.min && value <= rule.range2.max)
    );
  }

  nearbyTickets.forEach((t) => {
    t.forEach((n) => {
      for (let i = 0; i < rules.length; i++) {
        if (matchesRule(n, rules[i])) {
          return;
        }
      }
      errorRate += n;
    });
  });

  return errorRate;
}

function part2(rules, yourTicket, nearbyTickets) {
  const numFields = rules.length;
  // Filter out invalid tickets
  nearbyTickets = nearbyTickets.filter((ticket) =>
    ticket.every((value) => rules.some((rule) => matchesRule(value, rule)))
  );

  nearbyTickets.push(yourTicket);

  rules = rules.map((rule) => {
    const possibleIndices = [];

    for (let i = 0; i < numFields; i++) {
      if (nearbyTickets.every((ticket) => matchesRule(ticket[i], rule))) {
        possibleIndices.push(i);
      }
    }

    return {
      ...rule,
      possibleIndices,
    };
  });

  const solution = {};

  while (rules.length > 0) {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      rule.possibleIndices = rule.possibleIndices.filter(
        (n) => !Object.values(solution).includes(n)
      );
      if (rule.possibleIndices.length === 1) {
        solution[rule.label] = rule.possibleIndices[0];
        rules.splice(i, 1);
        i--;
      }
    }
  }

  console.log(solution);

  return Object.keys(solution)
    .filter((key) => key.startsWith("departure"))
    .map((key) => yourTicket[solution[key]])
    .reduce((a, b) => a * b);
}

run();
