"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [
    { href: "/", label: "Главная" },
    ...segments.map((seg, idx) => ({
      href: "/" + segments.slice(0, idx + 1).join("/"),
      label: decodeURIComponent(seg),
    })),
  ];

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Хлебные крошки" className="mb-6 text-sm text-[var(--muted)]">
      <ol className="flex flex-wrap items-center gap-1 rounded-full border border-[var(--border-soft)] bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur dark:bg-[var(--surface-muted)]">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <span className="text-zinc-300 dark:text-zinc-600">/</span>}
            {i === crumbs.length - 1 ? (
              <span className="max-w-[40ch] truncate text-[var(--heading)] dark:text-zinc-100">
                {c.label}
              </span>
            ) : (
              <Link
                href={c.href}
                className="rounded px-1 text-[var(--primary-700)] transition hover:text-[var(--primary-800)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] dark:text-[var(--primary-200)]"
              >
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

