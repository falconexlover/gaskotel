"use client";

import { useState } from "react";
import Link from "next/link";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree) {
      setStatus("error");
      setMessage("Необходимо согласие на обработку персональных данных.");
      return;
    }
    try {
      setStatus("loading");
      setMessage("");
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setMessage("Спасибо! Подтвердите подписку в письме, если требуется.");
        setEmail("");
        setAgree(false);
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(data?.error || "Не удалось оформить подписку. Повторите позже.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Сетевая ошибка. Попробуйте ещё раз.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш email"
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 outline-none ring-[var(--primary-700)] focus:ring-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          aria-label="Email для подписки"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-md bg-[var(--primary-700)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary-800)] disabled:opacity-60 dark:bg-[var(--primary-400)] dark:hover:bg-[var(--primary-300)] dark:text-zinc-900"
        >
          {status === "loading" ? "Отправка…" : "Подписаться"}
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          Я соглашаюсь с обработкой персональных данных и принимаю
          {" "}
          <Link href="/legal/privacy-policy" className="text-[var(--primary-700)] underline underline-offset-2 dark:text-[var(--primary-300)]">Политику конфиденциальности</Link>.
        </span>
      </label>
      <div aria-live="polite" className="text-xs text-zinc-600 dark:text-zinc-400 min-h-[1.25rem]">
        {message}
      </div>
    </form>
  );
}


