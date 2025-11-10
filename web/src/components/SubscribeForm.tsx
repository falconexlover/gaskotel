"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш email"
          className="w-full rounded-xl border border-[var(--border-soft)] bg-white/85 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-500 shadow-sm transition-colors focus:border-[var(--border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] dark:bg-[var(--surface-base)] dark:text-zinc-100"
          aria-label="Email для подписки"
        />
        <Button type="submit" size="md" loading={status === "loading"} className="w-full shrink-0 sm:w-auto">
          {status === "loading" ? "Отправляем…" : "Подписаться"}
        </Button>
      </div>
      <label className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 accent-[var(--primary-600)]"
        />
        <span>
          Я соглашаюсь с обработкой персональных данных и принимаю
          {" "}
          <Link href="/legal/privacy-policy" className="text-[var(--primary-700)] underline underline-offset-2 dark:text-[var(--primary-200)]">Политику конфиденциальности</Link>.
        </span>
      </label>
      <div
        aria-live="polite"
        className={`min-h-[1.25rem] text-xs ${
          status === "success"
            ? "text-emerald-600 dark:text-emerald-300"
            : status === "error"
              ? "text-red-600 dark:text-red-400"
              : "text-zinc-700 dark:text-zinc-400"
        }`}
      >
        {message}
      </div>
    </form>
  );
}

