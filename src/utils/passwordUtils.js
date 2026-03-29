export const charSets = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+{}[]<>?/|",
};

const similarChars = "0oO1lI";
const ambiguousChars = "~,;:.{}<>[]()/\\'`";

export const generatePassword = (length, options) => {
  let chars = "";

  Object.keys(options).forEach((key) => {
    if (options[key] && charSets[key]) {
      chars += charSets[key];
    }
  });

  if (options.excludeSimilar) {
    chars = chars
      .split("")
      .filter((c) => !similarChars.includes(c))
      .join("");
  }
  if (options.excludeAmbiguous) {
    chars = chars
      .split("")
      .filter((c) => !ambiguousChars.includes(c))
      .join("");
  }

  if (!chars) return "";

  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }

  return pass;
};

export const getStrength = (length) => {
  if (length >= 16) return "Very Secure";
  if (length >= 12) return "Secure";
  if (length >= 8) return "Medium";
  return "Weak";
};