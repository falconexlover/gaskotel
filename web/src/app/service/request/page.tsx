"use client";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-lg border border-zinc-300 bg-white/80 px-3 py-2 text-sm text-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-200)] focus:border-[var(--primary-300)] dark:border-zinc-700 dark:bg-zinc-950/60 dark:text-zinc-100 dark:focus:ring-[var(--primary-800)]";

export default function ServiceRequestPage() {
  return (
    <main className="space-y-6">
      <div className="rounded-3xl border border-white/70 bg-white/85 px-6 py-5 shadow-lg ring-1 ring-black/5 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-900/70 dark:ring-zinc-900/70">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Заявка на сервис</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-700 dark:text-zinc-400">
          Заполните форму, и мы передадим информацию в ближайший авторизованный сервисный центр. Менеджер свяжется с вами
          в течение рабочего дня.
        </p>
      </div>
      <form
        className="space-y-5 rounded-3xl border border-white/70 bg-white/85 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-900/70 dark:ring-zinc-900/70"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const data = Object.fromEntries(new FormData(form) as any);
          const phone = String((data as any).phone || "");
          if (!/\+?\d[\d\s\-\(\)]{8,}/.test(phone)) {
            alert("Введите корректный телефон");
            return;
          }
          fetch("/api/forms/service_request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
            .then(async (r) => { if (!r.ok) throw new Error(await r.text()); alert("Заявка отправлена"); form.reset(); })
            .catch((err) => alert("Ошибка: " + err.message));
        }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Ваше имя</label>
            <input name="name" required placeholder="Алексей Иванов" className={inputClasses} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Телефон</label>
            <input name="phone" required placeholder="+7 900 000-00-00" className={inputClasses} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Email</label>
            <input name="email" type="email" placeholder="you@example.ru" className={inputClasses} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Город</label>
            <input name="city" placeholder="Жуковский" className={inputClasses} />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-600">Модель оборудования</label>
          <input name="model" placeholder="АКГВ-11,6-3 (ЖУК)" className={inputClasses} />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-600">Описание проблемы</label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Расскажите, когда возникла неисправность и какие сообщения выводит автоматика."
            className={`${inputClasses} resize-none`}
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных и передачу информации партнёрам ОАО «ЖМЗ».
          </p>
          <Button type="submit" className="w-full sm:w-auto">
            Отправить заявку
          </Button>
        </div>
      </form>
    </main>
  );
}
