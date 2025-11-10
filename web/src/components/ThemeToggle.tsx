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
      root.classList.remove("light");
      try { localStorage.setItem("theme", "dark"); } catch {}
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      try { localStorage.setItem("theme", "light"); } catch {}
    }
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((v) => !v)}
      className="inline-flex h-9 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-white/70 px-3 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:border-[var(--border-strong)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-100)] dark:bg-[var(--surface-muted)] dark:text-[var(--primary-100)]"
      aria-label="Переключить тему"
      aria-pressed={dark}
    >
      {dark ? "Тёмная" : "Светлая"}
    </button>
  );
}
