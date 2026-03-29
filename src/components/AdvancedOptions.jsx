import { useState, useEffect } from "react";

const AdvancedOptions = ({ onGenerate }) => {
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

  const charSets = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+{}[]<>?/|",
  };

  const similar = "0oO1lI";
  const ambiguous = "~,;:.{}<>[]()/\\'`";

  const generate = () => {
    if (!length || length <= 0) {
      setResult("Enter valid length");
      return;
    }
    let base =
      charSets.lowercase +
      charSets.uppercase +
      charSets.numbers +
      charSets.symbols;

    if (excludeSimilar) base = filter(base, similar);
    if (excludeAmbiguous) base = filter(base, ambiguous);
    if (excludeChars) base = filter(base, excludeChars);
    if (includeChars) base += includeChars;

    let passwords = [];

    for (let c = 0; c < count; c++) {
      let pass = [];

      for (let i = 0; i < length; i++) {
        let ch = random(base);

        if (noDuplicate && pass.includes(ch)) {
          i--;
          continue;
        }

        pass.push(ch);
      }

      // begins with
      if (beginWith === "letter") {
        pass[0] = random(charSets.lowercase + charSets.uppercase);
      } else if (beginWith === "number") {
        pass[0] = random(charSets.numbers);
      }

      // ends with
      if (endWith === "letter") {
        pass[length - 1] = random(charSets.lowercase + charSets.uppercase);
      } else if (endWith === "number") {
        pass[length - 1] = random(charSets.numbers);
      }

      passwords.push(pass.join(""));
    }

    setResult(passwords.join("\n"));
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

  const random = (str) => str[Math.floor(Math.random() * str.length)];
  const filter = (str, remove) =>
    str
      .split("")
      .filter((c) => !remove.includes(c))
      .join("");
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default AdvancedOptions;
