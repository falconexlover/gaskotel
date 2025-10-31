"use client";
export function ContactForm() {
  return (
    <form
      className="mt-3 grid gap-3 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const data = Object.fromEntries(new FormData(form) as any);
        fetch("/api/forms/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
          .then(async (r) => { if (!r.ok) throw new Error(await r.text()); alert("Заявка отправлена"); form.reset(); })
          .catch((err) => alert("Ошибка: " + err.message));
      }}
    >
      <input name="name" required placeholder="Ваше имя" className="w-full rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" />
      <input name="phone" required placeholder="Телефон" pattern="\+?\d[\d\s\-\(\)]{8,}" title="Введите корректный номер телефона" className="w-full rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" />
      <input name="email" type="email" required placeholder="Email" className="w-full rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] md:col-span-2 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" />
      <textarea name="message" required placeholder="Сообщение" className="w-full rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] md:col-span-2 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" />
      <div className="md:col-span-2">
        <button className="rounded-md bg-[var(--primary-700)] px-4 py-2 text-white transition-colors hover:bg-[var(--primary-800)] active:translate-y-px">Отправить</button>
      </div>
    </form>
  );
}


