"use client";
import { useState } from "react";

type Review = { name: string; rating: number; message: string; createdAt: string };

export function Reviews({ initial = [] as Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initial);
  const [pending, setPending] = useState(false);

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xl font-semibold">Отзывы</h2>
      <div className="space-y-3">
        {reviews.length === 0 && (
          <div className="rounded-md border p-4 text-sm text-zinc-600">Пока нет отзывов. Будьте первым!</div>
        )}
        {reviews.map((r, i) => (
          <div key={i} className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">{r.name}</div>
              <div className="text-sm text-zinc-600">{new Date(r.createdAt).toLocaleDateString("ru-RU")}</div>
            </div>
            <div className="text-amber-500">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
            <p className="mt-1 text-zinc-800">{r.message}</p>
          </div>
        ))}
      </div>
      <form
        className="mt-4 space-y-3 rounded-md border p-4"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const data = new FormData(form);
          const name = String(data.get("name") || "").trim();
          const rating = Number(data.get("rating")) || 5;
          const message = String(data.get("message") || "").trim();
          if (!name || !message) return;
          setPending(true);
          fetch("/api/forms/review", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, rating, message }) })
            .then(async (r) => { if (!r.ok) throw new Error(await r.text());
              setReviews((prev) => [
                { name, rating, message, createdAt: new Date().toISOString() },
                ...prev,
              ]);
              form.reset();
            })
            .catch((err) => alert("Ошибка: " + err.message))
            .finally(() => setPending(false));
        }}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="name" required placeholder="Ваше имя" className="rounded-md border px-3 py-2" />
          <select name="rating" defaultValue={5} className="rounded-md border px-3 py-2">
            {[5,4,3,2,1].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <textarea name="message" required placeholder="Ваш отзыв" className="h-28 w-full rounded-md border px-3 py-2" />
        <button disabled={pending} className="rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 disabled:opacity-50">
          Отправить отзыв
        </button>
      </form>
    </section>
  );
}


