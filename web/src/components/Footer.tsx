import Link from "next/link";
import { site } from "@/config/site";
import { SocialLinks } from "@/components/SocialLinks";
import { SubscribeForm } from "@/components/SubscribeForm";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Колонка 1: Каталог / Услуги */}
          <nav aria-label="Категории" className="space-y-3">
            <div className="font-medium text-zinc-900 dark:text-zinc-100">Каталог и услуги</div>
            <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
              <li>
                <Link href="/catalog" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Каталог</Link>
              </li>
              <li>
                <Link href="/services" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Услуги</Link>
              </li>
              <li>
                <Link href="/service-centers" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Сервисные центры</Link>
              </li>
              <li>
                <Link href="/support/faq" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">FAQ</Link>
              </li>
            </ul>
          </nav>

          {/* Колонка 2: Поддержка / Документы */}
          <nav aria-label="Поддержка и документы" className="space-y-3">
            <div className="font-medium text-zinc-900 dark:text-zinc-100">Документы</div>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/payment-and-delivery" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Оплата и доставка</Link>
              </li>
              <li>
                <Link href="/legal/returns" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Возврат</Link>
              </li>
              <li>
                <Link href="/legal/personal-data-consent" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Согласие на обработку персональных данных</Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Политика конфиденциальности</Link>
              </li>
              <li>
                <Link href="/legal/public-offer" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Публичная оферта</Link>
              </li>
              <li>
                <Link href="/legal/warranty-and-returns" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Гарантийный срок и возврат</Link>
              </li>
            </ul>
          </nav>

          {/* Колонка 3: Контакты */}
          <div className="space-y-3">
            <div className="font-medium text-zinc-900 dark:text-zinc-100">Контакты</div>
            <address className="not-italic text-zinc-700 dark:text-zinc-300">
              {site.contacts.address}
              <div className="mt-2">
                <a href={`tel:${site.contacts.phoneHref}`} className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">{site.contacts.phoneDisplay}</a>
              </div>
              <div>
                <a href={`mailto:${site.contacts.email}`} className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">{site.contacts.email}</a>
              </div>
            </address>
          </div>

          {/* Колонка 4: Подписка и соцсети (плейсхолдер до реализации формы/иконок) */}
          <section aria-labelledby="footer-subscribe" className="space-y-3">
            <div id="footer-subscribe" className="font-medium text-zinc-900 dark:text-zinc-100">Подписка и соцсети</div>
            <SubscribeForm />
            <SocialLinks />
          </section>
        </div>

        <div className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p className="text-zinc-600 dark:text-zinc-400">© {new Date().getFullYear()} Газкотел. Все права защищены.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/sitemap.xml" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Карта сайта</Link>
              <Link href="/legal/privacy-policy" className="text-[var(--primary-700)] hover:underline underline-offset-2 dark:text-[var(--primary-300)]">Политика конфиденциальности</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


