import { useState, useEffect } from "react";

const words = [
  "tiger",
  "blue",
  "rocket",
  "shadow",
  "nova",
  "pixel",
  "storm",
  "echo",
  "blaze",
  "falcon",
];

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function Memorable() {
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState("");
  const [wordCount, setWordCount] = useState(3);
  const [separator, setSeparator] = useState("-");
  const [useNumbers, setUseNumbers] = useState(false);
  const [customWords, setCustomWords] = useState("");
  const [useCustomOnly, setUseCustomOnly] = useState(false);
  const [capitalize, setCapitalize] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500); // 1.5 sec
  };
  const generate = () => {
    const predefined = words;

    let customList = customWords
      .split(",")
      .map((w) => w.trim())
      .filter((w) => w.length > 0);

    // ❌ custom only but empty input
    if (useCustomOnly && customList.length === 0) {
      setPassword("Enter valid custom words");
      return;
    }

    let finalWords = [];

    // 🔹 Case 1: ONLY custom words
    if (useCustomOnly) {
      finalWords = customList;
    }

    // 🔹 Case 2: Mix custom + predefined
    else {
      // include all custom words first
      finalWords = [...customList];

      // then add random predefined words based on count
      for (let i = 0; i < wordCount; i++) {
        finalWords.push(random(predefined));
      }
    }

    // 🔤 Capitalize if needed
    if (capitalize) {
      finalWords = finalWords.map(
        (w) => w.charAt(0).toUpperCase() + w.slice(1),
      );
    }

    // 🔢 Build password
    let result = "";

    for (let i = 0; i < finalWords.length; i++) {
      result += finalWords[i];

      if (i < finalWords.length - 1) {
        if (useNumbers) {
          result += Math.floor(Math.random() * 101); // 0–100
        }
        result += separator || "";
      }
    }

    setPassword(result);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      generate();
    }, 200); // debounce

    return () => clearTimeout(timer);
  }, [
    wordCount,
    separator,
    useNumbers,
    customWords,
    useCustomOnly,
    capitalize,
  ]);

  return (
    <div className="space-y-4 flex flex-col items-center justify-center py-10">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full max-w-md p-6 space-y-4">
        <h2 className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md font-semibold">
          Easy to Remember Password Generator
        </h2>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex items-center justify-between">
          <input
            value={password}
            readOnly
            className="bg-transparent w-full outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            disabled={!password}
            onClick={copyToClipboard}
            className={`px-3 py-1 rounded-lg ml-2 text-white whitespace-nowrap min-w-[90px] text-center transition ${
              copied
                ? "bg-gray-400 dark:bg-gray-600"
                : "bg-green-500 dark:bg-green-400"
            }`}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>

        {/* Controls */}
        {/* Word count */}
        <div className="flex justify-between items-center">
          <span># of Words</span>
          <input
            type="number"
            value={wordCount}
            min={1}
            onChange={(e) => setWordCount(Number(e.target.value))}
            className="border p-1 rounded w-24 bg-white dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        {/* Custom Words */}
        <div className="flex flex-col gap-2">
          <span>Custom Words (comma separated)</span>
          <input
            value={customWords}
            onChange={(e) => setCustomWords(e.target.value)}
            placeholder="e.g. apple, mango, tiger"
            className="border p-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        {/* Use Custom Only */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useCustomOnly}
            onChange={() => setUseCustomOnly(!useCustomOnly)}
          />
          Use only custom words
        </label>
        {/* Capitalize */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={capitalize}
            onChange={() => setCapitalize(!capitalize)}
          />
          Capitalize words
        </label>
        {/* Separator */}
        <div className="flex justify-between items-center">
          <span>Separator</span>
          <input
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="border p-1 rounded w-24 bg-white dark:bg-gray-700 dark:border-gray-600"
            placeholder="-"
          />
        </div>

        {/* Numbers toggle */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
          Random Numbers between words
        </label>

        {/* Generate */}
        <button
          onClick={generate}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}
