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

export const calculateEntropy = (password) => {
  if (!password) return 0;

  let pool = 0;

  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(password)) pool += 32; // approx symbols

  if (pool === 0) return 0;

  return Math.round(password.length * Math.log2(pool));
};

export const getStrength = (entropy) => {
  if (entropy < 28) return "Weak";
  if (entropy < 50) return "Medium";
  if (entropy < 80) return "Strong";
  return "Very Secure";
};