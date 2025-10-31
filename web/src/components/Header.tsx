"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/icons/Logo";
import { ButtonSecondary } from "@/components/ui/Button";

const nav = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О предприятии" },
  { href: "/services", label: "Услуги" },
  { href: "/service-centers", label: "Сервис" },
  { href: "/support/faq", label: "Поддержка" },
  { href: "/news", label: "Новости" },
  { href: "/careers", label: "Карьера" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [shadow, setShadow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Закрывать меню при смене маршрута
  useEffect(() => {
    setOpen(false);
    setCatalogOpen(false);
  }, [pathname]);
  return (
    <header className={`sticky top-0 z-50 border-b ${shadow ? "shadow-sm" : ""} border-zinc-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:border-zinc-800 dark:bg-zinc-900/60 supports-[backdrop-filter]:dark:bg-zinc-900/50`}>
      <div className={`mx-auto max-w-7xl px-4 ${shadow ? "py-2" : "py-3"}`}>
        <div className="flex items-center justify-between gap-6">
          <Link href="/" aria-label="На главную">
            <Logo />
          </Link>
          <nav className="relative hidden items-center gap-5 md:flex" aria-label="Основная навигация">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-md px-1.5 py-1 text-sm transition-colors hover:text-[var(--primary-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-200)] dark:hover:text-[var(--primary-300)] ${
                  pathname === item.href ? "text-[var(--primary-800)] dark:text-[var(--primary-300)]" : "text-zinc-700 dark:text-zinc-300"
                }`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
                <span className={`pointer-events-none absolute -bottom-1 left-1/2 h-0.5 w-[0%] -translate-x-1/2 rounded-full bg-[var(--primary-700)] transition-all duration-300 ease-out dark:bg-[var(--primary-400)] ${
                  pathname === item.href ? "w-[60%]" : "group-hover:w-[60%]"
                }`} />
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setCatalogOpen(true)}
              onMouseLeave={() => setCatalogOpen(false)}
            >
              <button
                type="button"
                className={`rounded-md px-1.5 py-1 text-sm transition-colors hover:text-[var(--primary-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-200)] ${pathname.startsWith("/catalog") ? "text-[var(--primary-800)] dark:text-[var(--primary-300)]" : "text-zinc-700 dark:text-zinc-300"}`}
                onClick={() => setCatalogOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={catalogOpen}
                aria-controls="catalog-menu"
                onKeyDown={(e) => {
                  if (e.key === "Escape") setCatalogOpen(false);
                  if (e.key === "Enter" || e.key === " ") setCatalogOpen((v) => !v);
                  if (e.key === "ArrowDown") setCatalogOpen(true);
                }}
              >
                Каталог ▾
              </button>
              {catalogOpen && (
                <div id="catalog-menu" role="menu" className="absolute left-0 top-full z-[60] mt-2 w-[560px] rounded-xl border border-zinc-200 bg-white p-4 shadow-xl ring-1 ring-black/5 dark:border-zinc-800 dark:bg-zinc-900" onKeyDown={(e) => { if (e.key === "Escape") setCatalogOpen(false); }}>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <Link href="/catalog/gazovye-kotly" className="rounded-md p-3 hover:bg-[var(--primary-50)] dark:hover:bg-zinc-800/60" onClick={() => setCatalogOpen(false)}>
                      <div className="font-medium">Газовые котлы</div>
                      <div className="text-zinc-600 dark:text-zinc-400">Настенные и напольные</div>
                    </Link>
                    <Link href="/catalog/tverdotoplivnye-kotly" className="rounded-md p-3 hover:bg-[var(--primary-50)] dark:hover:bg-zinc-800/60" onClick={() => setCatalogOpen(false)}>
                      <div className="font-medium">Твердотопливные котлы</div>
                      <div className="text-zinc-600 dark:text-zinc-400">Энергонезависимые решения</div>
                    </Link>
                    <Link href="/catalog/pribory-ucheta" className="rounded-md p-3 hover:bg-[var(--primary-50)] dark:hover:bg-zinc-800/60" onClick={() => setCatalogOpen(false)}>
                      <div className="font-medium">Приборы учета</div>
                      <div className="text-zinc-600 dark:text-zinc-400">Счетчики воды и газа</div>
                    </Link>
                    <Link href="/catalog/plity" className="rounded-md p-3 hover:bg-[var(--primary-50)] dark:hover:bg-zinc-800/60" onClick={() => setCatalogOpen(false)}>
                      <div className="font-medium">Газовые плиты</div>
                      <div className="text-zinc-600 dark:text-zinc-400">Бытовые и проф.</div>
                    </Link>
                    <Link href="/catalog/aksessuary" className="rounded-md p-3 hover:bg-[var(--primary-50)] dark:hover:bg-zinc-800/60" onClick={() => setCatalogOpen(false)}>
                      <div className="font-medium">Аксессуары</div>
                      <div className="text-zinc-600 dark:text-zinc-400">Дымоходы, автоматика</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
          <form action="/search" className="ml-auto hidden items-center gap-2 md:flex">
            <label htmlFor="site-search" className="sr-only">Поиск</label>
            <input
              type="search"
              name="q"
              id="site-search"
              placeholder="Поиск по сайту"
              className="w-64 rounded-md border border-[var(--primary-300)] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)] dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
              autoComplete="off"
            />
          </form>
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a href="tel:+74952216644" className="text-sm text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">+7 (495) 221‑66‑44</a>
            <Link href="/service/request"><ButtonSecondary className="text-sm">Запрос КП</ButtonSecondary></Link>
          </div>
          <button
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 transition-colors hover:bg-zinc-50 md:hidden dark:border-zinc-700 dark:hover:bg-zinc-800/60"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-zinc-800 dark:text-zinc-200">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-zinc-800 dark:text-zinc-200">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
        {open && (
          <div id="mobile-menu" className="mt-3 space-y-2 md:hidden">
            <form action="/search" className="flex items-center gap-2">
              <label htmlFor="m-site-search" className="sr-only">Поиск</label>
              <input
                type="search"
                name="q"
                id="m-site-search"
                placeholder="Поиск по сайту"
                className="w-full rounded-md border border-zinc-300 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:bg-zinc-900/70 dark:border-zinc-700 dark:text-zinc-100"
                autoComplete="off"
              />
            </form>
            <div className="grid gap-2">
              <div className="text-xs uppercase text-zinc-500">Каталог</div>
              <Link href="/catalog/gazovye-kotly" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60">Газовые котлы</Link>
              <Link href="/catalog/plity" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60">Газовые плиты</Link>
              <Link href="/catalog/aksessuary" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60">Аксессуары</Link>
              <div className="h-px bg-zinc-200" />
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/60 ${
                    pathname === item.href ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a href="tel:+74952216644" className="rounded-md px-3 py-2 text-sm text-[var(--primary-700)] dark:text-[var(--primary-300)]">+7 (495) 221‑66‑44</a>
              <Link href="/service/request" onClick={() => setOpen(false)} className="rounded-md border border-[var(--primary-300)] px-3 py-2 text-center text-sm text-[var(--primary-700)] dark:border-zinc-700 dark:text-[var(--primary-300)]">Запрос КП</Link>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}


