const PasswordOptions = ({ length, setLength, options, setOptions }) => {
  const labels = {
    lowercase: "lowercase (eg: a-z)",
    uppercase: "uppercase (eg: A-Z)",
    numbers: "numbers (eg: 0-9)",
    symbols: "symbols (eg: !@#$%)",
    excludeSimilar: "exclude similar characters (0oO1lI)",
    excludeAmbiguous: "exclude ambiguous characters (~,;:.{}<>[]()/\\'`)",
  };
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm font-medium">
        <span>Password Length</span>
        <span>{length}</span>
      </div>

      <input
        type="range"
        min="4"
        max="32"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        className="w-full"
      />

      {Object.keys(options).map((key) => (
        <label key={key} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={options[key]}
            onChange={() => setOptions({ ...options, [key]: !options[key] })}
          />
          <span>{labels[key]}</span>
        </label>
      ))}
    </div>
  );
};

export default PasswordOptions;
