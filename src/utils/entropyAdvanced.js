import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";

// setup
zxcvbnOptions.setOptions({
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  translations: zxcvbnEnPackage.translations,
});

// hash rates
export const hashRates = {
  md5: 220.6e9,
  sha1: 70.2e9,
  sha512: 10e9,
  pbkdf2: 36e3,
  bcrypt: 9.5e3,
  scrypt: 7.76e3,
  argon2id: 2.2e3,
};

// gpu scales
export const gpuScales = [
  { label: "1 GPU", gpuCount: 1 },
  { label: "10 GPUs", gpuCount: 10 },
  { label: "100 GPUs", gpuCount: 100 },
  { label: "1k GPUs", gpuCount: 1000 },
  { label: "10k GPUs", gpuCount: 10000 },
];

// algorithms
export const hashAlgorithms = [
  { label: "MD5", key: "md5" },
  { label: "SHA-1", key: "sha1" },
  { label: "SHA-512", key: "sha512" },
  { label: "PBKDF2", key: "pbkdf2" },
  { label: "bcrypt", key: "bcrypt" },
  { label: "scrypt", key: "scrypt" },
  { label: "Argon2id", key: "argon2id" },
];

// entropy (REAL from zxcvbn)
export const calculateEntropy = (password) => {
  if (!password) return 0;
  const result = zxcvbn(password);
  return result.guessesLog10 * Math.log2(10);
};

// crack time
const calculateCrackTime = (entropy, hashKey, gpuCount) => {
  const rate = hashRates[hashKey] || hashRates.sha512;
  const total = rate * gpuCount;

  const combinations = Math.pow(2, Math.min(entropy, 100));
  const avgAttempts = combinations / 2;

  return avgAttempts / total;
};

const formatTime = (seconds) => {
  if (seconds < 60) return "Instant";
  if (seconds < 3600) return `${Math.round(seconds / 60)} min`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hrs`;
  if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;

  const years = seconds / 31536000;
  if (years < 1000) return `${Math.round(years)} yrs`;
  if (years < 1e6) return `${Math.round(years / 1000)}k yrs`;
  if (years < 1e9) return `${Math.round(years / 1e6)}M yrs`;
  if (years < 1e12) return `${Math.round(years / 1e9)}B yrs`;

  return "∞";
};

const getTier = (seconds) => {
  if (seconds < 86400) return "tier-1";
  if (seconds < 31536000) return "tier-2";
  if (seconds < 3.15e10) return "tier-3";
  if (seconds < 3.15e13) return "tier-4";
  return "tier-5";
};

export const getStrengthLabel = (entropy) => {
  if (entropy < 28) return "Very Weak";
  if (entropy < 36) return "Weak";
  if (entropy < 60) return "Moderate";
  if (entropy < 80) return "Strong";
  if (entropy < 100) return "Very Strong";
  return "Excellent";
};

export const getCellDisplay = (entropy, hashKey, gpuCount) => {
  const sec = calculateCrackTime(entropy, hashKey, gpuCount);
  return {
    text: formatTime(sec),
    tier: getTier(sec),
  };
};
