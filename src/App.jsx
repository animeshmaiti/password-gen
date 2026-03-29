import { useState, useEffect } from "react";
import PasswordDisplay from "./components/PasswordDisplay";
import PasswordOptions from "./components/PasswordOptions";
import GenerateButton from "./components/GenerateButton";
import StrengthIndicator from "./components/StrengthIndicator";
import { generatePassword, getStrength } from "./utils/passwordUtils";

import "./App.css";

function App() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("");

  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  });
  const isValid = Object.values(options)
    .slice(0, 4) // only first 4 (actual character types)
    .some((v) => v === true);

  const handleGenerate = () => {
    if (!isValid) {
      alert("Please select at least one character type!");
      return;
    }
    const pass = generatePassword(length, options);
    setPassword(pass);
  };
  useEffect(() => {
    handleGenerate();
  }, [length, options]);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 space-y-4">
        <h1 className="text-xl font-bold">Strong Password Generator</h1>

        <PasswordDisplay password={password} setPassword={setPassword} />

        <StrengthIndicator strength={getStrength(length)} />

        <PasswordOptions
          length={length}
          setLength={setLength}
          options={options}
          setOptions={setOptions}
        />

        <GenerateButton onGenerate={handleGenerate} />
      </div>
    </div>
  );
}

export default App;
