import Link from "next/link";
import { site } from "@/config/site";
import { SocialLinks } from "@/components/SocialLinks";
import { SubscribeForm } from "@/components/SubscribeForm";

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-[var(--border-soft)] bg-[var(--surface-glass)]/95 backdrop-blur">
      <div className="pointer-events-none absolute -left-20 top-0 h-40 w-40 rounded-full bg-[color-mix(in_oklab,var(--primary-300)_26%,transparent)] blur-[120px] opacity-70 dark:bg-[color-mix(in_oklab,var(--primary-600)_32%,transparent)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[color-mix(in_oklab,var(--primary-200)_22%,transparent)] blur-[120px] opacity-80 dark:bg-[color-mix(in_oklab,var(--primary-700)_28%,transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 text-sm md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <nav aria-label="Категории" className="space-y-4">
            <div className="text-base font-semibold text-[var(--heading)] dark:text-zinc-100">Каталог и услуги</div>
            <ul className="space-y-2 text-[var(--muted)]">
              <li>
                <Link href="/catalog" className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/services" className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/service-centers" className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  Сервисные центры
                </Link>
              </li>
              <li>
                <Link href="/support/faq" className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Поддержка и документы" className="space-y-4">
            <div className="text-base font-semibold text-[var(--heading)] dark:text-zinc-100">Документы</div>
            <ul className="space-y-2 text-[var(--muted)]">
              <li>
                <Link href="/legal/payment-and-delivery" className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  Оплата и доставка
                </Link>
              </li>
              <li>
                <Link href="/legal/returns" className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  Возврат
                </Link>
              </li>
              <li>
                <Link href="/legal/personal-data-consent" className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  Согласие на обработку персональных данных
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/legal/public-offer" className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  Публичная оферта
                </Link>
              </li>
              <li>
                <Link href="/legal/warranty-and-returns" className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  Гарантийный срок и возврат
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-4">
            <div className="text-base font-semibold text-[var(--heading)] dark:text-zinc-100">Контакты</div>
            <address className="space-y-2 not-italic text-[var(--muted)]">
              <div>{site.contacts.address}</div>
              <div className="space-y-1">
                <a href={`tel:${site.contacts.phoneHref}`} className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                  {site.contacts.phoneDisplay}
                </a>
                <div>
                  <a href={`mailto:${site.contacts.email}`} className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                    {site.contacts.email}
                  </a>
                </div>
              </div>
            </address>
          </div>

          <section aria-labelledby="footer-subscribe" className="space-y-4">
            <div id="footer-subscribe" className="text-base font-semibold text-[var(--heading)] dark:text-zinc-100">
              Подписка и соцсети
            </div>
            <SubscribeForm />
            <SocialLinks />
          </section>
        </div>

        <div className="mt-12 border-t border-[var(--border-soft)] pt-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p className="text-xs text-[color-mix(in_oklab,var(--muted)_80%,transparent)]">
              © {new Date().getFullYear()} {site.name}. Все права защищены.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <Link href="/sitemap.xml" className="rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                Карта сайта
              </Link>
              <Link href="/legal/privacy-policy" className="rounded-md px-1 py-0.5 text-[var(--primary-700)] transition hover:bg-white/70 hover:text-[var(--primary-800)] dark:text-[var(--primary-200)] dark:hover:bg-[color-mix(in_oklab,var(--primary-600)_18%,transparent)]">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
