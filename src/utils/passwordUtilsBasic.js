export const charSets = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+{}[]<>?/|",
};

const similarChars = "0oO1lI";
const ambiguousChars = "~,;:.{}<>[]()/\\'`";
const randomChar = (str) => str[Math.floor(Math.random() * str.length)];
const filter = (str, remove) =>
  str
    .split("")
    .filter((c) => !remove.includes(c))
    .join("");
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

export const generatePassword = (length, options) => {
  let chars = "";
  let required = [];

  if (options.lowercase) {
    chars += charSets.lowercase;
    required.push(randomChar(charSets.lowercase));
  }
  if (options.uppercase) {
    chars += charSets.uppercase;
    required.push(randomChar(charSets.uppercase));
  }
  if (options.numbers) {
    chars += charSets.numbers;
    required.push(randomChar(charSets.numbers));
  }
  if (options.symbols) {
    chars += charSets.symbols;
    required.push(randomChar(charSets.symbols));
  }

  // filters
  if (options.excludeSimilar) chars = filter(chars, similarChars);
  if (options.excludeAmbiguous) chars = filter(chars, ambiguousChars);

  let pass = [...required];

  for (let i = pass.length; i < length; i++) {
    pass.push(randomChar(chars));
  }

  return shuffle(pass).join("");
};