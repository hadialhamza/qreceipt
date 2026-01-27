"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700 ${className}`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-orange-400 transition-all" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700 transition-all" />
      )}
    </button>
  );
}
