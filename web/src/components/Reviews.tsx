"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icons } from "@/components/icons/Icons";
import { toast } from "sonner";
import { Card } from "@/components/ui/Card";

type Review = { name: string; rating: number; message: string; createdAt: string };

export function Reviews({ initial = [] as Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initial);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icons.Star
        key={i}
        className={`h-5 w-5 ${
          i < rating
            ? "fill-amber-400 text-amber-400"
            : "fill-zinc-200 text-zinc-200 dark:fill-zinc-700 dark:text-zinc-700"
        }`}
      />
    ));
  };

  return (
    <section className="mt-8">
      <h2 className="mb-6 text-2xl font-semibold text-[var(--heading)] dark:text-zinc-100">Отзывы</h2>
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <EmptyState
            title="Пока нет отзывов"
            description="Будьте первым, кто оставит отзыв о товаре!"
          />
        ) : (
          reviews.map((r, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="font-semibold text-[var(--heading)] dark:text-zinc-100">{r.name}</div>
                    <div className="flex items-center gap-0.5">{renderStars(r.rating)}</div>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">{r.message}</p>
                  <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {new Date(r.createdAt).toLocaleDateString("ru-RU", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      <Card className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-[var(--heading)] dark:text-zinc-100">Оставить отзыв</h3>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const data = new FormData(form);
            const name = String(data.get("name") || "").trim();
            const rating = Number(data.get("rating")) || 5;
            const message = String(data.get("message") || "").trim();

            const newErrors: { name?: string; message?: string } = {};
            if (!name) newErrors.name = "Введите имя";
            if (!message) newErrors.message = "Введите текст отзыва";

            setErrors(newErrors);
            if (Object.keys(newErrors).length > 0) {
              toast.error("Заполните все поля");
              return;
            }

            setPending(true);
            fetch("/api/forms/review", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, rating, message }),
            })
              .then(async (r) => {
                if (!r.ok) throw new Error(await r.text());
                setReviews((prev) => [
                  { name, rating, message, createdAt: new Date().toISOString() },
                  ...prev,
                ]);
                form.reset();
                setErrors({});
                toast.success("Отзыв успешно добавлен!");
              })
              .catch((err) => toast.error("Ошибка: " + err.message))
              .finally(() => setPending(false));
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input
                name="name"
                required
                placeholder="Ваше имя"
                className={`w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:text-zinc-100 ${
                  errors.name
                    ? "border-red-300 dark:border-red-700"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}
                onChange={() => errors.name && setErrors({ ...errors, name: undefined })}
              />
              {errors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>}
            </div>
            <div>
              <select
                name="rating"
                defaultValue={5}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "звезда" : n < 5 ? "звезды" : "звёзд"}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <textarea
              name="message"
              required
              placeholder="Ваш отзыв"
              rows={4}
              className={`w-full rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:text-zinc-100 resize-none ${
                errors.message
                  ? "border-red-300 dark:border-red-700"
                  : "border-zinc-300 dark:border-zinc-700"
              }`}
              onChange={() => errors.message && setErrors({ ...errors, message: undefined })}
            />
            {errors.message && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message}</p>}
          </div>
          <Button type="submit" loading={pending} className="w-full sm:w-auto">
            Отправить отзыв
          </Button>
        </form>
      </Card>
    </section>
  );
}


