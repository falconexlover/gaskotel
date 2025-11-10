"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Icons } from "@/components/icons/Icons";

export function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validatePhone = (phone: string) => {
    return /\+?\d[\d\s\-\(\)]{8,}/.test(phone);
  };

  return (
    <div className="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-glass)] p-6 backdrop-blur-md shadow-[0_25px_60px_-45px_rgba(59,130,246,0.55)] dark:bg-[var(--surface-muted)]">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Нужна консультация?</h3>
      <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">Оставьте контакты — перезвоним и подберём оборудование.</p>
      <form
        className="mt-4 grid gap-3 md:grid-cols-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const data = Object.fromEntries(new FormData(form) as any);
          const name = String(data.name || "").trim();
          const phone = String(data.phone || "").trim();
          
          const newErrors: { name?: string; phone?: string } = {};
          if (!name) newErrors.name = "Введите имя";
          if (!phone) newErrors.phone = "Введите телефон";
          else if (!validatePhone(phone)) newErrors.phone = "Введите корректный телефон";
          
          setErrors(newErrors);
          if (Object.keys(newErrors).length > 0) {
            toast.error("Проверьте правильность заполнения полей");
            return;
          }

          setLoading(true);
          try {
            const res = await fetch("/api/forms/lead", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, phone }),
            });
            if (res.ok) {
              toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
              form.reset();
              setErrors({});
            } else {
              const error = await res.json().catch(() => ({}));
              toast.error(error.error || "Ошибка при отправке заявки");
            }
          } catch (err: any) {
            toast.error("Ошибка: " + err.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        <div>
          <input
            name="name"
            required
            placeholder="Имя"
            className={`w-full rounded-xl border bg-[var(--surface-base)] px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-[var(--surface-base)] dark:text-zinc-100 ${
              errors.name
                ? "border-red-300 dark:border-red-500"
                : "border-[var(--border-soft)]"
            }`}
            onChange={() => errors.name && setErrors({ ...errors, name: undefined })}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>
        <div>
          <input
            name="phone"
            required
            type="tel"
            placeholder="Телефон"
            className={`w-full rounded-xl border bg-[var(--surface-base)] px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-[var(--surface-base)] dark:text-zinc-100 ${
              errors.phone
                ? "border-red-300 dark:border-red-500"
                : "border-[var(--border-soft)]"
            }`}
            onChange={() => errors.phone && setErrors({ ...errors, phone: undefined })}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.phone}</p>}
        </div>
        <Button type="submit" loading={loading} className="w-full">
          Отправить
        </Button>
      </form>
      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-300">
        Нажимая, вы соглашаетесь с обработкой персональных данных.
      </p>
    </div>
  );
}

