const faqs = [
  { q: "Как выбрать мощность котла?", a: "Ориентируйтесь на 100 Вт на 1 м², учитывая утепление и регион." },
  { q: "Нужна ли стабилизация?", a: "Рекомендуется использовать стабилизатор напряжения для защиты электроники." },
];

export default function FAQPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-semibold">Вопрос-ответ</h1>
      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-lg border p-4">
            <h3 className="font-medium">{f.q}</h3>
            <p className="mt-1 text-zinc-700">{f.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}


