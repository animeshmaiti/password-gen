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
