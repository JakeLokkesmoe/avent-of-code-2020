const { readLines } = require("../util");

async function run() {
  const lines = await readLines("Day 18/input.txt");

  const num = part1(lines);

  console.log(`Value at end of program: ${num}`);
}

const operators = {
  "+": 3,
  "*": 2,
};

function part1(lines) {
  function toRPN(line) {
    const tokens = line.split("");
    const output = [];
    const opStack = [];

    tokens.forEach((token) => {
      if (token === " ") return;
      if (!isNaN(token)) {
        output.push(token);
      } else if (operators[token] != null) {
        while (
          opStack.length > 0 &&
          opStack[opStack.length - 1] !== "(" &&
          operators[opStack[opStack.length - 1]] >= operators[token]
        ) {
          output.push(opStack.pop());
        }
        opStack.push(token);
      } else if (token === "(") {
        opStack.push(token);
      } else if (token === ")") {
        let top;
        while ((top = opStack.pop()) !== "(") {
          output.push(top);
        }
      }
    });

    while (opStack.length > 0) {
      output.push(opStack.pop());
    }

    return output.join(" ");
  }

  function evaluate(rpn) {
    rpn = rpn.split(" ");
    const stack = [];
    rpn.forEach((token) => {
      if (!isNaN(token)) {
        stack.push(parseInt(token));
      } else {
        const a = stack.pop();
        const b = stack.pop();
        if (token === "+") {
          stack.push(a + b);
        } else if (token === "*") {
          stack.push(a * b);
        }
      }
    });
    return stack.pop();
  }

  lines = lines.map(toRPN);

  lines = lines.map((n) => {
    const r = evaluate(n);
    console.log(`${n} = ${r}`);
    return r;
  });

  return lines.reduce((a, b) => a + b);
}

run();
