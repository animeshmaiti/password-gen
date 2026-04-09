import { useState } from "react";
import { NavLink } from "react-router-dom";
import lock from "../assets/locked.png";

const NavBar = ({ theme, setTheme }) => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-gray-200 dark:bg-gray-700 dark:text-white"
    }`;

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        {/* Hamburger (mobile only) */}
        <button className="md:hidden text-xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
        <div className="md:hidden flex items-center justify-center gap-2">
          <img src={lock} alt="Lock" className="w-6 h-6" />
          <p>PasswordLab</p>
        </div>
        {/* Desktop tabs */}
        <div className="hidden md:flex gap-2">
          <div className="flex items-center justify-center gap-2">
            <img src={lock} alt="Lock" className="w-6 h-6" />
            <p>PasswordLab</p>
          </div>
          <NavLink to="/" className={linkClass}>
            Basic
          </NavLink>
          <NavLink to="/advanced" className={linkClass}>
            Advanced
          </NavLink>
          <NavLink to="/memorable" className={linkClass}>
            Memorable
          </NavLink>
          <NavLink to="/entropy" className={linkClass}>
            Entropy Checker Advance
          </NavLink>
        </div>

        {/* Theme buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => setTheme("light")}
            className={`px-2 py-1 rounded ${
              theme === "light"
                ? "bg-yellow-400"
                : "bg-gray-200 dark:bg-gray-700"
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

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          open ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`flex flex-col gap-2 transform transition-all duration-500 ease-out ${
            open ? "translate-y-0" : "-translate-y-2"
          }`}
        >
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
            Basic
          </NavLink>
          <NavLink
            to="/advanced"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Advanced
          </NavLink>
          <NavLink
            to="/memorable"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Memorable
          </NavLink>
          <NavLink
            to="/entropy"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Entropy Checker Advance
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
