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
      <div>
        <label className="block text-sm font-medium">Password Length</label>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full border rounded-lg p-2"
        />
      </div>

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
