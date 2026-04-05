import { useState, useEffect } from "react";
import { generateAdvancedPasswords } from "../../../utils/passwordUtilsAdvanced";
import { getStrength, calculateEntropy } from "../../../utils/entropy";

const AdvancedOptions = () => {
  const [length, setLength] = useState(16);
  const [lengthInput, setLengthInput] = useState("16");
  const [includeChars, setIncludeChars] = useState("");
  const [excludeChars, setExcludeChars] = useState("");
  const [beginWith, setBeginWith] = useState("letter");
  const [endWith, setEndWith] = useState("any");
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [noDuplicate, setNoDuplicate] = useState(false);
  const [count, setCount] = useState(1);
  const [countInput, setCountInput] = useState("1");
  const [result, setResult] = useState("");

  const firstPassword = result.split("\n")[0] || "";
  const entropy = calculateEntropy(firstPassword);
  const strength = getStrength(entropy);

  const generate = () => {
    const res = generateAdvancedPasswords({
      length,
      includeChars,
      excludeChars,
      beginWith,
      endWith,
      excludeSimilar,
      excludeAmbiguous,
      noDuplicate,
      count,
    });

    setResult(res);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      generate();
    }, 200);

    return () => clearTimeout(timer);
  }, [
    length,
    includeChars,
    excludeChars,
    beginWith,
    endWith,
    excludeSimilar,
    excludeAmbiguous,
    noDuplicate,
    count,
  ]);
  return (
    <div className="space-y-4 flex flex-col items-center justify-center py-5 mx-2">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full max-w-md p-6 space-y-4">
        <h2 className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold">
          Advanced Password Generator
        </h2>

        {/* Length */}
        <div className="flex items-center justify-between">
          <span>Password Length:</span>
          <input
            type="number"
            value={lengthInput}
            onChange={(e) => {
              setLengthInput(e.target.value);
              if (e.target.value !== "") {
                setLength(Number(e.target.value));
              }
            }}
            className="border p-1 rounded w-20"
          />
        </div>

        {/* Include / Exclude */}
        <div className="flex flex-col gap-2">
          <span>Include Custom Character Sets:</span>
          <input
            placeholder="Characters to Include"
            value={includeChars}
            onChange={(e) => setIncludeChars(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span>Include Custom Character Sets:</span>
          <input
            placeholder="Characters to Exclude"
            value={excludeChars}
            onChange={(e) => setExcludeChars(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Begins */}
        <div>
          <span>Begins With:</span>
          <div className="flex gap-3">
            {["any", "letter", "number"].map((val) => (
              <label key={val}>
                <input
                  type="radio"
                  checked={beginWith === val}
                  onChange={() => setBeginWith(val)}
                />{" "}
                {val}
              </label>
            ))}
          </div>
        </div>

        {/* Ends */}
        <div>
          <span>Ends With:</span>
          <div className="flex gap-3">
            {["any", "letter", "number"].map((val) => (
              <label key={val}>
                <input
                  type="radio"
                  checked={endWith === val}
                  onChange={() => setEndWith(val)}
                />{" "}
                {val}
              </label>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={excludeSimilar}
              onChange={() => setExcludeSimilar(!excludeSimilar)}
            />
            Exclude Similar Characters
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={() => setExcludeAmbiguous(!excludeAmbiguous)}
            />
            Exclude Ambiguous Characters
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={noDuplicate}
              onChange={() => setNoDuplicate(!noDuplicate)}
            />
            No Duplicate Characters
          </label>
        </div>

        {/* Count */}
        <div className="flex items-center justify-between">
          <span>No. of Passwords:</span>
          <input
            type="number"
            value={countInput}
            onChange={(e) => {
              setCountInput(e.target.value);
              if (e.target.value !== "") {
                setCount(Number(e.target.value));
              }
            }}
            className="border p-1 rounded w-20"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={generate}
            className="flex-1 bg-blue-600 text-white py-2 rounded"
          >
            Generate
          </button>

          <button
            onClick={() => navigator.clipboard.writeText(result)}
            className="flex-1 bg-green-600 text-white py-2 rounded"
          >
            Copy
          </button>
        </div>

        {/* Output */}
        <textarea
          value={result}
          readOnly
          rows={4}
          className="w-full border p-2 rounded resize-none overflow-auto"
        />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Entropy: {entropy} bits</span>
            <span>{strength}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded">
            <div
              className={`h-2 rounded transition-all duration-300 ${
                strength === "Weak"
                  ? "bg-red-500 w-1/4"
                  : strength === "Medium"
                    ? "bg-yellow-500 w-2/4"
                    : strength === "Strong"
                      ? "bg-green-500 w-3/4"
                      : "bg-blue-500 w-full"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptions;
