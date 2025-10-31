export function Price({ value }: { value?: number }) {
  if (value == null) return null;
  return <span className="font-semibold text-[var(--primary-800)]">{value.toLocaleString("ru-RU")} ₽</span>;
}


