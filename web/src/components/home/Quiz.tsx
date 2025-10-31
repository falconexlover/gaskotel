"use client";
import { useMemo, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export function Quiz() {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState<string>("");
  const [circuit, setCircuit] = useState<"1" | "2" | "">("");
  const [chamber, setChamber] = useState<"open" | "closed" | "">("");

  const recs = useMemo(() => {
    const a = Number(area) || 0;
    return PRODUCTS.filter((p) => p.category === "gazovye-kotly")
      .filter((p) => (a ? Number((p.attributes || {})["Мощность"]?.replace(/\D+/g, "")) * 1 >= a / 10 : true))
      .filter((p) => (circuit ? String((p.attributes || {})["Контуры"]) === circuit : true))
      .filter((p) => (chamber ? (chamber === "closed" ? /закрыта/i.test(String((p.attributes || {})["Камера сгорания"])) : /открыта/i.test(String((p.attributes || {})["Камера сгорания"])) ) : true))
      .slice(0, 3);
  }, [area, circuit, chamber]);

  return (
    <div className="rounded-2xl border p-6">
      <h2 className="text-xl font-semibold">Подбор оборудования</h2>
      {step === 1 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <label className="text-sm text-zinc-600">Площадь помещения (м²)</label>
          <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="например 120" className="w-full rounded-md border px-3 py-2" />
          <div className="sm:col-span-2 mt-2 flex justify-end">
            <button className="rounded-md bg-zinc-900 px-4 py-2 text-white" onClick={() => setStep(2)} disabled={!area}>Далее</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="mt-4 space-y-3">
          <div>
            <div className="mb-2 text-sm text-zinc-600">Количество контуров</div>
            <div className="flex gap-2">
              {(["1","2"] as const).map((c) => (
                <button key={c} onClick={() => setCircuit(c)} className={`rounded-md border px-3 py-2 ${circuit===c?"bg-zinc-900 text-white":""}`}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm text-zinc-600">Камера сгорания</div>
            <div className="flex gap-2">
              {(["open","closed"] as const).map((t) => (
                <button key={t} onClick={() => setChamber(t)} className={`rounded-md border px-3 py-2 ${chamber===t?"bg-zinc-900 text-white":""}`}>{t==="open"?"Открытая":"Закрытая"}</button>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button className="rounded-md border px-4 py-2" onClick={() => setStep(1)}>Назад</button>
            <button className="rounded-md bg-zinc-900 px-4 py-2 text-white" onClick={() => setStep(3)} disabled={!circuit || !chamber}>Показать</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="mt-4">
          <div className="mb-3 text-sm text-zinc-600">Результаты (до 3)</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recs.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
            {recs.length===0 && <div className="rounded-md border p-4 text-sm text-zinc-600">Нет результатов, скорректируйте параметры.</div>}
          </div>
          <div className="mt-4 flex justify-between">
            <button className="rounded-md border px-4 py-2" onClick={() => setStep(2)}>Назад</button>
            <button className="rounded-md px-4 py-2 underline" onClick={() => setStep(1)}>Сбросить</button>
          </div>
        </div>
      )}
    </div>
  );
}


