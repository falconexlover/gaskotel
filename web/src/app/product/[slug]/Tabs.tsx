"use client";
import { useState } from "react";

export function Tabs({
  characteristics,
  documents,
}: {
  characteristics?: Record<string, string>;
  documents?: { title: string; url: string }[];
}) {
  const [tab, setTab] = useState<"specs" | "docs">("specs");
  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <button
          className={`rounded-md px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] ${tab === "specs" ? "bg-[var(--primary-700)] text-white" : "border border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/60"}`}
          onClick={() => setTab("specs")}
        >
          Характеристики
        </button>
        <button
          className={`rounded-md px-3 py-1.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] ${tab === "docs" ? "bg-[var(--primary-700)] text-white" : "border border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800/60"}`}
          onClick={() => setTab("docs")}
        >
          Документы
        </button>
      </div>
      {tab === "specs" && characteristics && (
        <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
          {Object.entries(characteristics).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3">
              <dt className="text-zinc-500 dark:text-zinc-400">{k}</dt>
              <dd className="text-zinc-900 dark:text-zinc-100">{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {tab === "docs" && documents && (
        <ul className="mt-4 space-y-2 text-sm">
          {documents.map((d) => (
            <li key={d.title}>
              <a href={d.url} className="group inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-2 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/60">
                <span className="i">📄</span>
                <span className="text-zinc-800 group-hover:underline dark:text-zinc-100">{d.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


