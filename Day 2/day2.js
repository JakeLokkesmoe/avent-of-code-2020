const fs = require("fs");

fs.readFile("./Day 2/input.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  day2(data.split("\n"));
});

function day2(input) {
  const result = input.reduce(
    (count, pwd) => (checkPasswordV2(pwd) ? count + 1 : count),
    0
  );
  console.log(`Number of Valid Passwords: ${result}`);
}

function checkPassword(line) {
  const [rule, password] = line.split(": ");
  const [countRule, letter] = rule.split(" ");
  const [min, max] = countRule.split("-");
  const occur = password
    .split("")
    .reduce((count, n) => (n === letter ? count + 1 : count), 0);
  return occur >= min && occur <= max;
}

function checkPasswordV2(line) {
  const [rule, password] = line.split(": ");
  const [countRule, letter] = rule.split(" ");
  const [pos1, pos2] = countRule.split("-");
  if (password.charAt(pos1 - 1) === letter) {
    return password.charAt(pos2 - 1) !== letter;
  }
  return password.charAt(pos2 - 1) === letter;
}
