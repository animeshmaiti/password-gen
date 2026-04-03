import { NavLink } from "react-router-dom";

const NavBar = ({ theme, setTheme }) => {
  return (
    <div className="flex justify-between items-center gap-2 p-2 rounded bg-gray-100 dark:bg-gray-800">
      {/* Tabs */}
      <div className="flex gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-1 rounded transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`
          }
        >
          Basic
        </NavLink>

        <NavLink
          to="/advanced"
          className={({ isActive }) =>
            `px-3 py-1 rounded transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`
          }
        >
          Advanced
        </NavLink>
      </div>

      {/* Theme Toggle */}
      <div className="flex gap-1">
        <button
          onClick={() => setTheme("light")}
          className={`px-2 py-1 rounded ${
            theme === "light" ? "bg-yellow-400" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          ☀
        </button>

        <button
          onClick={() => setTheme("dark")}
          className={`px-2 py-1 rounded ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          🌙
        </button>

        <button
          onClick={() => setTheme("system")}
          className={`px-2 py-1 rounded ${
            theme === "system"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          💻
        </button>
      </div>
    </div>
  );
};

export default NavBar;
