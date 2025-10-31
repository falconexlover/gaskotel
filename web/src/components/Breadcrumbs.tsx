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
    <nav aria-label="Хлебные крошки" className="mb-5 text-sm text-[var(--muted)]">
      <ol className="flex flex-wrap items-center gap-1">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <span className="text-zinc-300 dark:text-zinc-700">/</span>}
            {i === crumbs.length - 1 ? (
              <span className="max-w-[40ch] truncate text-zinc-900 dark:text-zinc-100">{c.label}</span>
            ) : (
              <Link href={c.href} className="rounded px-1 text-[var(--primary-700)] underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] dark:text-[var(--primary-300)]">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}


