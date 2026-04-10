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

//   const copyToClipboard = () => {
//   if (navigator.clipboard && window.isSecureContext) {
//     navigator.clipboard.writeText(password)
//       .then(() => {
//         setCopied(true);
//         setTimeout(() => setCopied(false), 1500);
//       })
//       .catch(() => fallbackCopy());
//   } else {
//     fallbackCopy();
//   }
// };

// const fallbackCopy = () => {
//   const textArea = document.createElement("textarea");
//   textArea.value = password;

//   // Avoid scrolling to bottom
//   textArea.style.position = "fixed";
//   textArea.style.left = "-999999px";

//   document.body.appendChild(textArea);
//   textArea.focus();
//   textArea.select();

//   try {
//     document.execCommand("copy");
//     setCopied(true);
//     setTimeout(() => setCopied(false), 1500);
//   } catch (err) {
//     alert("Copy failed. Please copy manually.");
//   }

//   document.body.removeChild(textArea);
// };

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
