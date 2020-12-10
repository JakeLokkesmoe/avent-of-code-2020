const fs = require("fs");

fs.readFile("Day 01/input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  part2(data.split("\n").map((s) => parseInt(s, 10)));
});

function part1(input) {
  const set = {};
  for (var i = 0; i < input.length; i++) {
    let num = input[i];
    set[num] = true;
    if (set[2020 - num]) {
      const res = num * (2020 - num);
      console.log(`Result: ${num} * ${2020 - num} = ${res}`);
      return res;
    }
  }
  return 0;
}

function part2(input) {
  for (let i = 0; i < input.length; i++) {
    const num1 = input[i];
    for (let k = 0; k < input.length; k++) {
      if (k === i) continue;
      const num2 = input[k];
      for (let j = 0; j < input.length; j++) {
        if (j === k || j === i) continue;
        const num3 = input[j];

        if (num1 + num2 + num3 === 2020) {
          const res = num1 * num2 * num3;

          console.log(`Result: ${num1} * ${num2} * ${num3} = ${res}`);
          return res;
        }
      }
    }
  }

  console.log("No Matches Found");
  return 0;
}
