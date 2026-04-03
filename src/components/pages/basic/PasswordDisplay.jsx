import { useState } from "react";

function PasswordDisplay({ password, setPassword }) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500); // 1.5 sec
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex items-center justify-between">
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-transparent w-full outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      <button
        disabled={!password}
        onClick={copyToClipboard}
        className={`px-3 py-1 rounded-lg ml-2 text-white whitespace-nowrap min-w-[90px] text-center transition ${
          copied ? "bg-gray-400 dark:bg-gray-600" : "bg-green-500 dark:bg-green-400"
        }`}
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}

export default PasswordDisplay;
