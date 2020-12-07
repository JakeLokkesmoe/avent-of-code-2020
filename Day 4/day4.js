const read = require("../util").read;

async function run() {
  const file = await read("Day 4/input.txt");

  const passports = file.split("\n\n");

  const valid = passports
    .filter(processPassport)
    .reduce((c, p) => (p ? c + 1 : c), 0);

  console.log(`Valid passports: ${valid}`);
}

function processPassport(passport) {
  const d = passport
    .split(/\s+/)
    .filter(Boolean)
    .reduce((acc, t) => {
      const [key, value] = t.split(":");
      acc[key] = value;
      return acc;
    }, {});

  if (!d.byr || !d.byr.match(/^\d{4}$/) || d.byr < 1920 || d.byr > 2002)
    return false;

  if (!d.iyr || !d.iyr.match(/^\d{4}$/) || d.iyr < 2010 || d.iyr > 2020)
    return false;

  if (!d.eyr || !d.eyr.match(/^\d{4}$/) || d.eyr < 2020 || d.eyr > 2030)
    return false;

  if (!d.hgt || !d.hgt.match(/^\d+(cm|in)$/i)) {
    return false;
  } else {
    const unit = d.hgt.slice(-2);
    const value = d.hgt.slice(0, -2);
    if (unit === "cm" && (value < 150 || value > 193)) return false;
    if (unit === "in" && (value < 59 || value > 76)) return false;
  }

  if (!d.hcl || !d.hcl.match(/^#[0-9a-f]{6}$/i)) return false;

  if (["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(d.ecl) === -1)
    return false;

  if (!d.pid || !d.pid.match(/^\d{9}$/)) return false;

  return true;
}

run();
