const charSets = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+{}[]<>?/|",
};

const similar = "0oO1lI";
const ambiguous = "~,;:.{}<>[]()/\\'`";

const random = (str) => {
  const arr = new Uint32Array(1);
  let max = Math.floor(0xffffffff / str.length) * str.length;

  do {
    crypto.getRandomValues(arr);
  } while (arr[0] >= max);

  return str[arr[0] % str.length];
};
const filter = (str, remove) =>
  str
    .split("")
    .filter((c) => !remove.includes(c))
    .join("");

export const generateAdvancedPasswords = ({
  length,
  includeChars,
  excludeChars,
  beginWith,
  endWith,
  excludeSimilar,
  excludeAmbiguous,
  noDuplicate,
  count,
}) => {
  if (!length || length <= 0) return "Enter valid length";

  let base =
    charSets.lowercase +
    charSets.uppercase +
    charSets.numbers +
    charSets.symbols;

  if (excludeSimilar) base = filter(base, similar);
  if (excludeAmbiguous) base = filter(base, ambiguous);
  if (excludeChars) base = filter(base, excludeChars);

  const includeLen = includeChars ? includeChars.length : 0;
  const beginReq = beginWith !== "any" ? 1 : 0;
  const endReq = endWith !== "any" ? 1 : 0;

  if (includeLen + beginReq + endReq > length) {
    return "Too many constraints for given length";
  }
  let passwords = [];
  for (let c = 0; c < count; c++) {
    let pass = new Array(length).fill(null);

    const includeArr = includeChars ? includeChars.split("") : [];

    if (includeArr.length > length) {
      return "Include chars exceed password length";
    }

    let locked = new Set();

    // 1. Lock begin
    if (beginWith === "letter") {
      pass[0] = random(charSets.lowercase + charSets.uppercase);
      locked.add(0);
    } else if (beginWith === "number") {
      pass[0] = random(charSets.numbers);
      locked.add(0);
    }

    // 2. Lock end
    if (endWith === "letter") {
      pass[length - 1] = random(charSets.lowercase + charSets.uppercase);
      locked.add(length - 1);
    } else if (endWith === "number") {
      pass[length - 1] = random(charSets.numbers);
      locked.add(length - 1);
    }

    let freePositions = [];
    for (let i = 0; i < length; i++) {
      if (!locked.has(i)) freePositions.push(i);
    }

    // 3. Place include chars in random FREE positions
    for (let ch of includeArr) {
      const idx = Math.floor(Math.random() * freePositions.length);
      const pos = freePositions.splice(idx, 1)[0];

      pass[pos] = ch;
      locked.add(pos);
    }

    // 4. Fill remaining positions
    for (let i = 0; i < length; i++) {
      if (pass[i] !== null) continue;

      let ch = random(base);

      if (noDuplicate && pass.includes(ch)) {
        i--;
        continue;
      }

      pass[i] = ch;
    }

    passwords.push(pass.join(""));
  }

  return passwords.join("\n");
};
