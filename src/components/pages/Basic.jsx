import { useState, useEffect } from "react";
import PasswordDisplay from "./basic/PasswordDisplay";
import PasswordOptions from "./basic/PasswordOptions";
import GenerateButton from "./basic/GenerateButton";
import StrengthIndicator from "./basic/StrengthIndicator";
import { generatePassword, getStrength } from "../../utils/passwordUtilsBasic";

const Basic = () => {
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
    <div className="space-y-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-6 space-y-4">
        <h2 className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold">
          Basic Password Generator
        </h2>

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
};

export default Basic;
