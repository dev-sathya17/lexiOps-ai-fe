import { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (
      saved === "dark" ||
      (!saved &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setTheme(isDark ? "dark" : "light");
  };

  return (
    <header
      className="flex justify-between items-center px-4 sm:px-8 py-6 
                   bg-white dark:bg-black/10 
                   text-gray-900 dark:text-gray-200
                   border-b border-gray-300 dark:border-gray-200/30
                   backdrop-blur-sm transition-colors duration-300"
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={Logo} alt="LexiOps AI Logo" className="w-8 h-8 inline mr-2" />
        <h1 className="text-xl md:text-2xl font-bold bg-linear-to-r from-pink-500 to-blue-400 bg-clip-text text-transparent">
          LexiOps AI
        </h1>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-pink-400 transition ${
              isActive ? "text-pink-400 font-semibold" : "text-gray-500"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/features"
          className={({ isActive }) =>
            `hover:text-pink-400 transition ${
              isActive ? "text-pink-400 font-semibold" : "text-gray-500"
            }`
          }
        >
          Features
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `hover:text-pink-400 transition ${
              isActive ? "text-pink-400 font-semibold" : "text-gray-500"
            }`
          }
        >
          Pricing
        </NavLink>
        <NavLink
          to="/docs"
          className={({ isActive }) =>
            `hover:text-pink-400 transition ${
              isActive ? "text-pink-400 font-semibold" : "text-gray-500"
            }`
          }
        >
          Docs
        </NavLink>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <NavLink
          to="/sign-up"
          className="px-4 py-2 rounded-lg bg-linear-to-r from-pink-500 to-blue-400 text-black font-semibold shadow-lg hover:opacity-90 transition"
        >
          Get Started
        </NavLink>
      </nav>

      {/* Mobile Nav */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-300 dark:text-gray-700"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      {isOpen && (
        <div className="absolute top-16 right-4 dark:bg-zinc-900 bg-white border dark:border-white/10 border-gray-200 rounded-lg shadow-lg p-4 flex flex-col item gap-3 md:hidden z-50">
          <NavLink to="/features" className="hover:text-pink-400">
            Features
          </NavLink>
          <NavLink to="/pricing" className="hover:text-pink-400">
            Pricing
          </NavLink>
          <NavLink to="/docs" className="hover:text-pink-400">
            Docs
          </NavLink>

          {/* Theme toggle inside mobile menu */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-lg hover:text-pink-400 transition"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <NavLink
            to="/sign-up"
            className="px-4 py-2 rounded-lg bg-linear-to-r from-pink-500 to-blue-400 text-black font-semibold shadow-lg hover:opacity-90 transition text-center"
          >
            Get Started
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
