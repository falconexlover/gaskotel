"use client";
import { useState } from "react";

export function SeoText() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border bg-white/80 p-6 backdrop-blur ring-1 ring-black/5 dark:bg-zinc-900/60">
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">О заводе и продукции</h2>
      <p className={`mt-2 text-sm text-zinc-800 dark:text-zinc-300 ${open ? "" : "line-clamp-3"}`}>
        Жуковский машиностроительный завод — производитель газового оборудования с широким ассортиментом котлов, плит и аксессуаров. На предприятии внедрены современные стандарты управления качеством, продукция проходит многоуровневый контроль и соответствует требованиям ГОСТ. Развитая сеть сервисных центров обеспечивает гарантийное и постгарантийное обслуживание, а техническая поддержка помогает в подборе и эксплуатации оборудования. Мы предлагаем решения для частных домов, коттеджей и коммерческих объектов, уделяя внимание энергоэффективности и безопасности.
      </p>
      <div className="mt-3 flex items-center gap-4">
        <button className="text-sm underline underline-offset-2 text-[var(--primary-700)] hover:text-[var(--primary-800)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] dark:text-[var(--primary-300)]" onClick={() => setOpen((v) => !v)}>
          {open ? "Свернуть" : "Развернуть"}
        </button>
        <a href="/about" className="text-sm text-[var(--primary-700)] underline underline-offset-2 hover:text-[var(--primary-800)] dark:text-[var(--primary-300)]">
          Подробнее о предприятии
        </a>
      </div>
    </div>
  );
}


