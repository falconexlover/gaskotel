"use client";
import { useMemo, useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Icons } from "@/components/icons/Icons";
import { Button, ButtonGhost, ButtonOutline } from "@/components/ui/Button";

type Product = {
  slug: string;
  name: string;
  description?: string;
  price?: number;
  category: string;
  attributes?: Record<string, string>;
};

export function Quiz() {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState<string>("");
  const [circuit, setCircuit] = useState<"1" | "2" | "">("");
  const [chamber, setChamber] = useState<"open" | "closed" | "">("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Загружаем все газовые котлы при монтировании
    setLoading(true);
    fetch("/api/products?category=gazovye-kotly&perPage=100")
      .then((r) => r.json())
      .then((data: any) => {
        const items = Array.isArray(data?.items) ? data.items : [];
        setProducts(
          items.map((p: any) => {
            const attributesMap = Object.fromEntries(
              (p.attributes ?? []).map((av: any) => [
                av.attribute.name,
                av.valueString ?? av.valueNumber ?? av.valueBool ?? "",
              ])
            ) as Record<string, string>;
            return {
              slug: p.slug,
              name: p.name,
              description: p.description,
              price: p.price,
              category: p.category.slug,
              attributes: attributesMap,
            };
          })
        );
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const recs = useMemo(() => {
    const a = Number(area) || 0;
    return products
      .filter((p) => p.category === "gazovye-kotly")
      .filter((p) => {
        if (!a) return true;
        const powerStr = p.attributes?.["Мощность"] || "";
        const powerNum = Number(powerStr.replace(/\D+/g, ""));
        return powerNum * 1 >= a / 10;
      })
      .filter((p) => {
        if (!circuit) return true;
        return String(p.attributes?.["Контуры"] || "") === circuit;
      })
      .filter((p) => {
        if (!chamber) return true;
        const chamberStr = String(p.attributes?.["Камера сгорания"] || "").toLowerCase();
        return chamber === "closed" ? chamberStr.includes("закрыта") : chamberStr.includes("открыта");
      })
      .slice(0, 3);
  }, [area, circuit, chamber, products]);

  const optionButton = (active: boolean) =>
    `inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "border-[var(--border-strong)] bg-[color-mix(in_oklab,var(--primary-600)_22%,white)] text-[var(--primary-800)] shadow-sm dark:bg-[color-mix(in_oklab,var(--primary-500)_24%,var(--surface-base))] dark:text-[var(--primary-50)]"
        : "border-[var(--border-soft)] bg-[var(--surface-base)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:bg-white/85 dark:hover:bg-[color-mix(in_oklab,var(--primary-500)_12%,transparent)]"
    }`;

  const steps = [
    { id: 1, label: "Площадь" },
    { id: 2, label: "Параметры" },
    { id: 3, label: "Результаты" },
  ];
  const progress = (step / steps.length) * 100;

  return (
    <div className="rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-base)] p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--heading)] dark:text-zinc-100">Подбор оборудования</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">До 5 вопросов • <span className="text-[var(--primary-600)] dark:text-[var(--primary-200)]">1–2 минуты</span></p>
        </div>
        <div className="flex items-center gap-2">
          {steps.map((item) => (
            <div key={item.id} className="flex items-center gap-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <span
                className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${
                  step === item.id
                    ? "border-[var(--primary-500)] bg-[var(--primary-50)] text-[var(--primary-700)] dark:bg-[var(--primary-900)]/40 dark:text-[var(--primary-200)]"
                    : step > item.id
                    ? "border-[var(--primary-200)] bg-[var(--primary-50)] text-[var(--primary-600)]"
                    : "border-[var(--border-soft)] bg-white text-zinc-400"
                }`}
              >
                {item.id}
              </span>
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-muted)]">
        <div className="h-full rounded-full bg-[var(--primary-500)] transition-all" style={{ width: `${progress}%` }} />
      </div>
      {loading && step === 1 && (
        <div className="mt-4 text-sm text-zinc-700 dark:text-zinc-400">Загрузка...</div>
      )}
      {step === 1 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <label className="text-sm text-zinc-700 dark:text-zinc-400">Площадь помещения (м²)</label>
          <input
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="например 120"
            className="w-full rounded-xl border border-[var(--border-soft)] bg-white/90 px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-500 transition-colors focus:border-[var(--border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] dark:bg-[var(--surface-muted)] dark:text-zinc-100"
          />
          <div className="sm:col-span-2 mt-2 flex justify-end">
            <Button
              type="button"
              size="md"
              className="inline-flex items-center gap-2"
              onClick={() => setStep(2)}
              disabled={!area}
            >
              Далее
              <Icons.ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="mt-4 space-y-3">
          <div>
            <div className="mb-2 text-sm text-zinc-700 dark:text-zinc-400">Количество контуров</div>
            <div className="flex flex-wrap gap-2">
              {(["1", "2"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCircuit(c)}
                  className={optionButton(circuit === c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm text-zinc-700 dark:text-zinc-400">Камера сгорания</div>
            <div className="flex flex-wrap gap-2">
              {(["open", "closed"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setChamber(t)}
                  className={optionButton(chamber === t)}
                >
                  {t === "open" ? "Открытая" : "Закрытая"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <ButtonOutline className="inline-flex items-center gap-2" onClick={() => setStep(1)}>
              <Icons.ChevronLeft className="h-4 w-4" />
              Назад
            </ButtonOutline>
            <Button
              type="button"
              className="inline-flex items-center gap-2"
              onClick={() => setStep(3)}
              disabled={!circuit || !chamber}
            >
              Получить подбор
              <Icons.Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="mt-4">
          <div className="mb-3 text-sm text-zinc-700 dark:text-zinc-400">Результаты (до 3)</div>
          {recs.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {recs.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-base)] p-4 text-sm text-zinc-700 dark:text-zinc-300">
              Нет результатов, скорректируйте параметры.
            </div>
          )}
          <div className="mt-4 flex justify-between">
            <ButtonOutline className="inline-flex items-center gap-2" onClick={() => setStep(2)}>
              <Icons.ChevronLeft className="h-4 w-4" />
              Назад
            </ButtonOutline>
            <ButtonGhost
              className="inline-flex items-center gap-2 text-[var(--primary-700)] hover:text-[var(--primary-800)] dark:text-[var(--primary-200)]"
              onClick={() => {
                setStep(1);
                setArea("");
                setCircuit("");
                setChamber("");
              }}
            >
              <Icons.XCircle className="h-4 w-4" />
              Сбросить
            </ButtonGhost>
          </div>
        </div>
      )}
    </div>
  );
}
