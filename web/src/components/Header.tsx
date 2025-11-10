"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/icons/Logo";
import { ButtonSecondary } from "@/components/ui/Button";
import { Icons } from "@/components/icons/Icons";
import { site } from "@/config/site";

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/service-centers", label: "Сервис" },
  { href: "/support/faq", label: "Поддержка" },
  { href: "/about", label: "О предприятии" },
  { href: "/news", label: "Новости" },
  { href: "/careers", label: "Карьера" },
  { href: "/contacts", label: "Контакты" },
];

const catalogRoot = {
  href: "/catalog",
  title: "Весь каталог",
  description: "Полный набор разделов и фильтров",
};

const catalogLinks = [
  { href: "/catalog/gazovye-kotly", title: "Газовые котлы", description: "Настенные и напольные решения" },
  { href: "/catalog/tverdotoplivnye-kotly", title: "Твёрдотопливные котлы", description: "Автоматические и ручные модели" },
  { href: "/catalog/plity", title: "Газовые плиты", description: "Бытовые и профессиональные платформы" },
  { href: "/catalog/vodonagrevateli", title: "Водонагреватели", description: "Проточные и накопительные системы" },
  { href: "/catalog/aksessuary", title: "Аксессуары", description: "Автоматика, дымоходы, комплектующие" },
  { href: "/catalog/teploobmenniki", title: "Теплообменники", description: "Пластинчатые и трубчатые" },
  { href: "/catalog/servisnye-nabory", title: "Сервисные наборы", description: "Инструменты для монтажников" },
  { href: "/catalog/umnoe-upravlenie", title: "Умное управление", description: "Термостаты, контроллеры" },
  { href: "/catalog/zapasnye-chasti", title: "Запасные части", description: "Оригинальные комплектующие" },
];

const getVisibleCount = (width: number) => {
  if (width >= 1280) return NAV_LINKS.length;
  if (width >= 1140) return 6;
  if (width >= 1024) return 5;
  if (width >= 920) return 4;
  if (width >= 780) return 3;
  return 2;
};

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [visibleCount, setVisibleCount] = useState(NAV_LINKS.length);
  const navRef = useRef<HTMLDivElement | null>(null);
  const catalogRef = useRef<HTMLDivElement | null>(null);
  const moreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setCatalogOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const next = getVisibleCount(entry.contentRect.width);
      setVisibleCount(next);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (catalogOpen && catalogRef.current && target && !catalogRef.current.contains(target)) {
        setCatalogOpen(false);
      }
      if (moreOpen && moreRef.current && target && !moreRef.current.contains(target)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCatalogOpen(false);
        setMoreOpen(false);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [catalogOpen, moreOpen]);

  useEffect(() => {
    if (visibleCount >= NAV_LINKS.length && moreOpen) {
      setMoreOpen(false);
    }
  }, [visibleCount, moreOpen]);

  const visibleNav = NAV_LINKS.slice(0, visibleCount);
  const overflowNav = NAV_LINKS.slice(visibleCount);

  return (
    <header className="sticky top-0 z-50 px-3 py-2.5 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div
          className={`relative flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-glass)] px-4 py-2.5 shadow-sm backdrop-blur-md transition-all duration-200 sm:gap-4 md:flex-nowrap md:justify-between dark:bg-[var(--surface-base)] ${
            shadow ? "border-[var(--border-strong)] shadow-lg" : ""
          }`}
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <Link href="/" aria-label="На главную" className="flex items-center">
              <Logo />
            </Link>
            <div className="hidden min-w-0 flex-1 items-center gap-2 md:flex">
              <div className="relative flex-shrink-0" ref={catalogRef}>
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-lg border border-[var(--border-soft)] bg-white/90 px-3 py-1.5 text-sm font-semibold text-[var(--primary-800)] shadow-sm transition hover:border-[var(--border-strong)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-200)] dark:bg-[var(--surface-muted)] dark:text-[var(--primary-100)] ${
                    pathname.startsWith("/catalog") ? "border-[var(--border-strong)]" : ""
                  }`}
                  onClick={() => setCatalogOpen((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={catalogOpen}
                  aria-controls="catalog-menu"
                >
                  <Icons.Menu className="h-4 w-4" aria-hidden />
                  Каталог
                  <Icons.ChevronDown className={`h-4 w-4 transition ${catalogOpen ? "rotate-180" : "rotate-0"}`} aria-hidden />
                </button>
                {catalogOpen && (
                  <div
                    id="catalog-menu"
                    role="menu"
                    className="absolute left-0 top-full z-[60] mt-3 w-[560px] rounded-2xl border border-[var(--border-soft)] bg-white/95 p-5 shadow-2xl backdrop-blur-xl dark:bg-[var(--surface-base)]"
                  >
                    <Link
                      href={catalogRoot.href}
                      onClick={() => setCatalogOpen(false)}
                      className="mb-4 flex items-center justify-between rounded-xl border border-[var(--border-strong)] bg-white px-4 py-3 text-sm font-semibold text-[var(--primary-700)] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-[var(--surface-muted)] dark:text-[var(--primary-100)]"
                    >
                      <div>
                        <div className="text-base font-semibold">{catalogRoot.title}</div>
                        <div className="text-xs font-normal text-zinc-700 dark:text-zinc-400">{catalogRoot.description}</div>
                      </div>
                      <Icons.ChevronRight className="h-4 w-4 text-[var(--primary-500)] dark:text-[var(--primary-200)]" />
                    </Link>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      {catalogLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-xl border border-transparent bg-white/70 p-3 shadow-sm transition-colors hover:border-[var(--border-strong)] hover:bg-white dark:bg-[var(--surface-muted)] dark:hover:bg-[color-mix(in_oklab,var(--primary-500)_18%,var(--surface-muted))]"
                          onClick={() => setCatalogOpen(false)}
                        >
                          <div className="font-semibold text-[var(--heading)] dark:text-zinc-100">{item.title}</div>
                          <div className="mt-1 text-xs text-zinc-700 dark:text-zinc-400">{item.description}</div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between rounded-xl bg-[var(--primary-50)]/80 p-4 text-sm text-[var(--primary-800)] dark:bg-[color-mix(in_oklab,var(--primary-700)_28%,transparent)] dark:text-[var(--primary-100)]">
                      <div>
                        <div className="font-semibold">Нужна консультация?</div>
                        <div className="text-xs text-[var(--primary-700)]/80 dark:text-[var(--primary-100)]/80">Оставьте заявку — поможем с подбором.</div>
                      </div>
                      <Link
                        href="/service/request"
                        className="rounded-lg border border-[var(--border-strong)] bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--primary-700)] shadow-sm transition-colors hover:bg-white dark:bg-[var(--surface-base)] dark:text-[var(--primary-100)]"
                        onClick={() => setCatalogOpen(false)}
                      >
                        Запрос КП
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <nav
                ref={navRef}
                className="relative hidden flex-1 items-center gap-1.5 overflow-visible whitespace-nowrap md:flex"
                aria-label="Основная навигация"
              >
                {visibleNav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:text-[var(--primary-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-200)] dark:hover:text-[var(--primary-200)] ${
                        active ? "text-[var(--primary-800)] dark:text-[var(--primary-200)]" : "text-zinc-700 dark:text-zinc-300"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                      <span
                        className={`pointer-events-none absolute -bottom-1 left-1/2 h-0.5 w-[0%] -translate-x-1/2 rounded-full bg-[var(--primary-600)] transition-all duration-300 ease-out dark:bg-[var(--primary-300)] ${
                          active ? "w-[72%]" : "group-hover:w-[72%]"
                        }`}
                      />
                    </Link>
                  );
                })}
                {overflowNav.length > 0 && (
                  <div className="relative" ref={moreRef}>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium text-zinc-700 transition hover:text-[var(--primary-800)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-200)] dark:text-zinc-300 dark:hover:text-[var(--primary-200)]"
                      onClick={() => setMoreOpen((v) => !v)}
                      aria-haspopup="menu"
                      aria-expanded={moreOpen}
                    >
                      Ещё
                      <Icons.ChevronDown className={`h-4 w-4 transition ${moreOpen ? "rotate-180" : "rotate-0"}`} aria-hidden />
                    </button>
                    {moreOpen && (
                      <div
                        role="menu"
                        className="absolute right-0 top-full z-[55] mt-2 min-w-[220px] rounded-2xl border border-[var(--border-soft)] bg-white/95 p-3 shadow-xl backdrop-blur-xl dark:bg-[var(--surface-base)]"
                      >
                        {overflowNav.map((item) => {
                          const active = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMoreOpen(false)}
                              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--surface-muted)] dark:hover:bg-[color-mix(in_oklab,var(--primary-500)_18%,transparent)] ${
                                active ? "text-[var(--primary-700)] dark:text-[var(--primary-100)]" : "text-zinc-700 dark:text-zinc-300"
                              }`}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </nav>
            </div>
          </div>
          <div className="hidden flex-shrink-0 items-center gap-2 md:flex md:flex-wrap md:justify-end lg:gap-3 lg:flex-nowrap">
            <form action="/search" className="relative hidden xl:block">
              <label htmlFor="site-search" className="sr-only">
                Поиск
              </label>
              <Icons.Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="search"
                name="q"
                id="site-search"
                placeholder="Поиск по каталогу"
                className="w-72 rounded-xl border border-[var(--border-soft)] bg-white/70 pl-9 pr-3 py-2 text-sm text-zinc-700 shadow-sm transition-colors focus:border-[var(--border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] dark:bg-[var(--surface-muted)] dark:text-zinc-100"
                autoComplete="off"
              />
            </form>
            <Link
              href="/search"
              aria-label="Поиск"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-soft)] text-zinc-600 transition hover:text-[var(--primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-100)] xl:hidden dark:text-zinc-200"
            >
              <Icons.Search className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${site.contacts.phoneHref}`}
              aria-label={`Позвонить: ${site.contacts.phoneDisplay}`}
              className="hidden items-center gap-2 rounded-lg border border-transparent bg-white/70 px-3 py-2 text-sm font-semibold text-[var(--primary-700)] shadow-sm transition hover:border-[var(--border-strong)] hover:bg-white dark:bg-[var(--surface-muted)] dark:text-[var(--primary-100)] xl:flex"
            >
              <Icons.Phone className="h-4 w-4" />
              {site.contacts.phoneDisplay}
            </a>
            <a
              href={`tel:${site.contacts.phoneHref}`}
              aria-label={`Позвонить: ${site.contacts.phoneDisplay}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-soft)] text-[var(--primary-700)] transition hover:text-[var(--primary-800)] xl:hidden dark:text-[var(--primary-100)]"
            >
              <Icons.Phone className="h-4 w-4" />
            </a>
            <Link href="/service/request">
              <ButtonSecondary size="sm" className="hidden lg:inline-flex">
                Запрос КП
              </ButtonSecondary>
            </Link>
            <Link
              href="/service/request"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-soft)] text-sm font-semibold text-[var(--primary-700)] transition hover:text-[var(--primary-900)] lg:hidden"
              aria-label="Запрос КП"
            >
              КП
            </Link>
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-[var(--border-soft)] p-2 text-sm text-zinc-700 transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-[var(--surface-muted)] md:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Icons.X className="h-5 w-5" /> : <Icons.Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div
            id="mobile-menu"
            className="mt-3 space-y-2 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-glass)] p-4 shadow-lg backdrop-blur-md md:hidden dark:bg-[var(--surface-base)]"
          >
            <form action="/search" className="flex items-center gap-2">
              <label htmlFor="m-site-search" className="sr-only">
                Поиск
              </label>
              <div className="relative w-full">
                <Icons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="search"
                  name="q"
                  id="m-site-search"
                  placeholder="Поиск по сайту"
                  className="w-full rounded-xl border border-[var(--border-soft)] bg-white/70 pl-9 pr-3 py-2 text-sm transition-colors focus:border-[var(--border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-100)] dark:bg-[var(--surface-muted)] dark:text-zinc-100"
                  autoComplete="off"
                />
              </div>
            </form>
            <div className="grid gap-2">
              <div className="text-xs uppercase text-zinc-500">Каталог</div>
              <Link
                href={catalogRoot.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--primary-700)] transition-colors hover:bg-white dark:text-[var(--primary-100)] dark:hover:bg-[color-mix(in_oklab,var(--primary-500)_18%,transparent)]"
              >
                {catalogRoot.title}
              </Link>
              {catalogLinks.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white dark:hover:bg-[color-mix(in_oklab,var(--primary-500)_15%,transparent)]"
                >
                  {item.title}
                </Link>
              ))}
              <div className="h-px bg-[var(--border-soft)]" />
              {NAV_LINKS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white dark:hover:bg-[color-mix(in_oklab,var(--primary-500)_15%,transparent)] ${
                      active ? "bg-white/70 text-[var(--primary-700)] dark:bg-[var(--surface-muted)] dark:text-[var(--primary-100)]" : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href={`tel:${site.contacts.phoneHref}`}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-[var(--primary-700)] hover:bg-white dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-500)_18%,transparent)]"
              >
                {site.contacts.phoneDisplay}
              </a>
              <Link
                href="/service/request"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-[var(--border-strong)] px-3 py-2 text-center text-sm font-semibold text-[var(--primary-700)] shadow-sm transition-colors hover:bg-white dark:text-[var(--primary-100)]"
              >
                Запрос КП
              </Link>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
