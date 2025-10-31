"use client";
export function LeadForm() {
  return (
    <div className="rounded-2xl border p-6 bg-white/80 backdrop-blur ring-1 ring-black/5 dark:bg-zinc-900/60">
      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Нужна консультация?</h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Оставьте контакты — перезвоним и подберём оборудование.</p>
      <form
        className="mt-3 grid gap-3 md:grid-cols-3"
        onSubmit={(e) => {
          e.preventDefault();
          const data = Object.fromEntries(new FormData(e.currentTarget) as any);
          const phone = String((data as any).phone || "");
          if (!/\+?\d[\d\s\-\(\)]{8,}/.test(phone)) {
            alert("Введите корректный телефон");
            return;
          }
          console.log("lead:", data);
          alert("Заявка отправлена (демо)");
          (e.currentTarget as HTMLFormElement).reset();
        }}
      >
        <input name="name" required placeholder="Имя" className="rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" />
        <input name="phone" required placeholder="Телефон" className="rounded-md border px-3 py-2 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100" />
        <button className="rounded-md bg-[var(--primary-700)] px-4 py-2 text-white transition-colors hover:bg-[var(--primary-800)] active:translate-y-px">Отправить</button>
      </form>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">Нажимая, вы соглашаетесь с обработкой персональных данных.</p>
    </div>
  );
}


