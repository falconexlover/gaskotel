export default function ServiceRequestPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Заявка на сервис</h1>
      <form
        className="space-y-4 rounded-lg border p-6"
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
            <input name="name" required className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Телефон</label>
            <input name="phone" required placeholder="+7 900 000-00-00" className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Email</label>
            <input name="email" type="email" className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-600">Город</label>
            <input name="city" className="w-full rounded-md border px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-600">Модель оборудования</label>
          <input name="model" className="w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-600">Описание проблемы</label>
          <textarea name="message" required className="w-full rounded-md border px-3 py-2" />
        </div>
        <button className="rounded-md bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800">Отправить</button>
      </form>
    </main>
  );
}


