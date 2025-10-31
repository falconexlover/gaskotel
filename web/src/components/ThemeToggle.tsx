"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Инициализация темы при первом рендере с учётом localStorage и системных настроек
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved ? saved === "dark" : prefersDark;
    setDark(initialDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      try { localStorage.setItem("theme", "dark"); } catch {}
    } else {
      root.classList.remove("dark");
      try { localStorage.setItem("theme", "light"); } catch {}
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-300 px-3 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/60"
      aria-label="Переключить тему"
      aria-pressed={dark}
    >
      {dark ? "Тёмная" : "Светлая"}
    </button>
  );
}


