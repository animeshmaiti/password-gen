import { useState } from "react";
import {
  calculateEntropy,
  gpuScales,
  hashAlgorithms,
  getCellDisplay,
} from "../../utils/entropyAdvanced";

export default function EntropyChecker() {
  const [password, setPassword] = useState("Tr0ub4dor&3");

  const entropy = calculateEntropy(password);
  const getTierColor = (tier) => {
    switch (tier) {
      case "tier-1":
        return "text-purple-400";
      case "tier-2":
        return "text-red-400";
      case "tier-3":
        return "text-orange-400";
      case "tier-4":
        return "text-yellow-400";
      case "tier-5":
        return "text-green-400";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="space-y-6 text-black dark:text-white w-full max-w-2xl mt-6 mx-auto px-2">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Password Entropy Checker</h1>
          <p className="text-gray-300">
            How long would it take to crack a password?
          </p>
        </div>
        {/* Input */}
        <div className="flex flex-col items-center gap-2 w-full">
          <p className="text-sm text-gray-300">ENTER PASSWORD</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-200 dark:bg-gray-700 outline-none"
          />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center w-fit mx-auto gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center w-40">
            <p className="text-sm text-gray-500">Entropy</p>
            <p className="font-semibold">{entropy.toFixed(1)} bits</p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center w-40">
            <p className="text-sm text-gray-500">Length</p>
            <p className="font-semibold">{password.length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <table className="w-full text-sm text-center border-collapse">
            {/* Header */}
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="py-2 text-left">Algorithm</th>
                {gpuScales.map((g) => (
                  <th key={g.label} className="py-2">
                    {g.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {hashAlgorithms.map((algo) => (
                <tr
                  key={algo.key}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-2 text-left font-semibold">{algo.label}</td>

                  {gpuScales.map((g) => {
                    const cell = getCellDisplay(entropy, algo.key, g.gpuCount);

                    return (
                      <td
                        key={g.label}
                        className={`py-2 ${getTierColor(cell.tier)}`}
                      >
                        {cell.text}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
