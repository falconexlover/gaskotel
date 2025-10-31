export function Badge({ children, color = "primary" }: { children: React.ReactNode; color?: "primary" | "accent" }) {
  const cls =
    color === "accent"
      ? "bg-[var(--accent-100)] text-[var(--accent-700)]"
      : "bg-[var(--primary-50)] text-[var(--primary-700)]";
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${cls}`}>{children}</span>;
}


