import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Basic from "./components/pages/Basic";
import Advanced from "./components/pages/Advanced";
import Memorable from "./components/pages/Memorable";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("system");

  // apply theme
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      if (theme === "dark") {
        root.classList.add("dark");
      } else if (theme === "light") {
        root.classList.remove("dark");
      } else {
        const isDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        root.classList.toggle("dark", isDark);
      }
    };

    applyTheme();

    if (theme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", theme);
    }

    if (theme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  // load saved theme
  useEffect(() => {
  const saved = localStorage.getItem("theme");

  if (saved === "light" || saved === "dark") {
    setTheme(saved);
  } else {
    setTheme("system"); // fallback
  }
}, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Tabs (Navbar) */}
      <NavBar theme={theme} setTheme={setTheme} />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Basic />} />
        <Route path="/advanced" element={<Advanced />} />
        <Route path="/memorable" element={<Memorable />} />
      </Routes>
    </div>
  );
}

export default App;
