import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm bg-base-200 text-base-content border border-base-content hover:bg-primary hover:text-white transition-all"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
      <span className="ml-1 hidden md:inline">
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default ThemeToggle;
