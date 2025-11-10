"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  title: string;
  description?: string;
  priceText: string;
  priceValue: number | null;
};

type CatalogCategory = {
  title: string;
  count: number;
  items?: Product[];
  subcategories?: Array<{
    title: string;
    count: number;
    items: Product[];
  }>;
};

type NormalizedProduct = Product & { id: string };

type NormalizedSubcategory = {
  title: string;
  items: NormalizedProduct[];
};

type NormalizedCategory = {
  title: string;
  items: NormalizedProduct[];
  subcategories?: NormalizedSubcategory[];
};

type CatalogContentProps = {
  categories: CatalogCategory[];
};

const normalizeProducts = (products: Product[] = []) =>
  products.map((product, index) => ({
    ...product,
    id: `${product.title}-${product.priceText}-${index}`,
  }));

const normalizeCategories = (categories: CatalogCategory[]): NormalizedCategory[] =>
  categories.map((category) => {
    if (Array.isArray(category.subcategories) && category.subcategories.length > 0) {
      return {
        title: category.title,
        items: [],
        subcategories: category.subcategories.map((sub) => ({
          title: sub.title,
          items: normalizeProducts(sub.items ?? []),
        })),
      };
    }

    return {
      title: category.title,
      items: normalizeProducts(category.items ?? []),
    };
  });

const countProducts = (category: NormalizedCategory) => {
  if (category.subcategories) {
    return category.subcategories.reduce((acc, sub) => acc + sub.items.length, 0);
  }
  return category.items.length;
};

const filterByQuery = (categories: NormalizedCategory[], query: string) => {
  if (!query.trim()) {
    return categories;
  }

  const normalizedQuery = query.trim().toLowerCase();

  const productMatches = (product: NormalizedProduct) => {
    const haystack = `${product.title} ${product.description ?? ""}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  };

  return categories
    .map((category) => {
      if (category.subcategories) {
        const filteredSubcategories = category.subcategories
          .map((sub) => ({
            ...sub,
            items: sub.items.filter(productMatches),
          }))
          .filter((sub) => sub.items.length > 0);

        return {
          ...category,
          subcategories: filteredSubcategories,
        };
      }

      return {
        ...category,
        items: category.items.filter(productMatches),
      };
    })
    .filter((category) => {
      if (category.subcategories) {
        return category.subcategories.length > 0;
      }
      return category.items.length > 0;
    });
};

const CategoryLinks = ({
  categories,
  prefix = "category",
  textSize = "text-sm",
  countSize = "text-xs",
  activeCategoryId,
  activeSubId,
}: {
  categories: NormalizedCategory[];
  prefix?: string;
  textSize?: string;
  countSize?: string;
  activeCategoryId?: string;
  activeSubId?: string | null;
}) => (
  <nav className="space-y-3">
    {categories.map((category, index) => {
      const categoryId = `${prefix}-${index}`;
      const isActiveCategory = activeCategoryId === categoryId;
      return (
        <div key={`${category.title}-${index}`}>
          <a
            href={`#${categoryId}`}
            className={`block rounded-xl px-3 py-2 font-semibold transition-colors ${textSize} ${
              isActiveCategory
                ? "bg-gaskotel-secondary/10 text-gaskotel-secondary"
                : "text-slate-600 hover:text-gaskotel-secondary"
            }`}
            aria-current={isActiveCategory ? "true" : undefined}
          >
            {category.title}
            <span className={`ml-2 font-normal text-slate-400 ${countSize}`}>({countProducts(category)})</span>
          </a>
          {category.subcategories && (
            <ul className="mt-2 space-y-1 border-l border-slate-200 pl-3">
              {category.subcategories.map((sub, subIndex) => {
                const subId = `${categoryId}-sub-${subIndex}`;
                const isActiveSub = activeSubId === subId;
                return (
                  <li key={`${category.title}-${sub.title}-${subIndex}`}>
                    <a
                      href={`#${subId}`}
                      className={`block rounded-lg px-2 py-1 text-xs font-medium transition-colors ${
                        isActiveSub
                          ? "bg-gaskotel-secondary/10 text-gaskotel-secondary"
                          : "text-slate-500 hover:text-gaskotel-secondary"
                      }`}
                      aria-current={isActiveSub ? "true" : undefined}
                    >
                      {sub.title}
                      <span className="ml-1 text-[11px] text-slate-400">({sub.items.length})</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );
    })}
  </nav>
);

const CategoryNavDesktop = ({
  categories,
  activeCategoryId,
  activeSubId,
}: {
  categories: NormalizedCategory[];
  activeCategoryId?: string;
  activeSubId?: string | null;
}) => (
  <aside className="hidden lg:block lg:sticky lg:top-24 h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 className="text-lg font-semibold text-slate-900 mb-4">Категории</h2>
    <CategoryLinks categories={categories} activeCategoryId={activeCategoryId} activeSubId={activeSubId} />
  </aside>
);

const CategoryNavMobile = ({
  categories,
  activeCategoryId,
  activeSubId,
}: {
  categories: NormalizedCategory[];
  activeCategoryId?: string;
  activeSubId?: string | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden sticky top-16 z-20">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <button
          type="button"
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>Категории</span>
          <span className="text-xs text-slate-500">{isOpen ? "Скрыть" : "Показать"}</span>
        </button>
        {isOpen && (
          <div className="border-t border-slate-100 px-4 py-4 max-h-[60vh] overflow-y-auto">
            <CategoryLinks
              categories={categories}
              textSize="text-base"
              countSize="text-xs"
              prefix="category"
              activeCategoryId={activeCategoryId}
              activeSubId={activeSubId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const currencyFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

const formatPrice = (product: Product) => {
  if (product.priceValue !== null && Number.isFinite(product.priceValue)) {
    return currencyFormatter.format(product.priceValue);
  }
  return product.priceText;
};

const ProductCard = ({ product, contextLabel }: { product: NormalizedProduct; contextLabel: string }) => (
  <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
    <div className="flex items-center justify-between gap-2">
      <span className="rounded-full bg-gaskotel-secondary/10 px-3 py-1 text-xs font-semibold text-gaskotel-secondary">
        {contextLabel}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">ЖМЗ</span>
    </div>
    <div 
      className="mt-4 flex h-32 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-white text-center text-xs font-semibold uppercase text-slate-400"
      role="img"
      aria-label="Изображение товара"
    >
      Изображение товара
    </div>
    <div className="mt-4 text-base font-semibold text-gaskotel-primary">{product.title}</div>
    {product.description && (
      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{product.description}</p>
    )}
    <div className="mt-4 text-lg font-bold text-gaskotel-secondary">{formatPrice(product)}</div>
    <div className="mt-auto flex flex-col gap-2 pt-4">
      <a
        href="tel:+74952216688"
        className="inline-flex items-center justify-center rounded-xl border border-gaskotel-secondary px-4 py-2 text-sm font-semibold text-gaskotel-secondary transition-colors hover:bg-gaskotel-secondary hover:text-white"
      >
        Заказать по телефону
      </a>
      <a
        href="mailto:zmz@gaskotel.ru?subject=Запрос%20коммерческого%20предложения"
        className="inline-flex items-center justify-center rounded-xl bg-gaskotel-secondary/10 px-4 py-2 text-sm font-semibold text-gaskotel-secondary transition-colors hover:bg-gaskotel-secondary/20"
      >
        Запросить КП
      </a>
    </div>
  </div>
);

const CategorySection = ({ category, index }: { category: NormalizedCategory; index: number }) => {
  if (category.subcategories) {
    return (
      <section
        id={`category-${index}`}
        className="space-y-10"
        data-catalog-section
        data-section-id={`category-${index}`}
        data-section-type="category"
      >
        <header>
          <h2 className="text-3xl font-bold text-slate-900">{category.title}</h2>
          <p className="mt-2 text-sm text-slate-500">Всего товаров: {countProducts(category)}</p>
        </header>

        <div className="space-y-12">
          {category.subcategories.map((subcategory, subIndex) => (
            <div
              key={`${category.title}-${subcategory.title}`}
              id={`category-${index}-sub-${subIndex}`}
              className="space-y-6"
              data-catalog-section
              data-section-id={`category-${index}-sub-${subIndex}`}
              data-section-type="subcategory"
              data-parent-id={`category-${index}`}
            >
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">{subcategory.title}</h3>
                <p className="mt-1 text-sm text-slate-500">Товаров: {subcategory.items.length}</p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {subcategory.items.map((product) => (
                  <ProductCard key={product.id} product={product} contextLabel={subcategory.title} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id={`category-${index}`}
      className="space-y-6"
      data-catalog-section
      data-section-id={`category-${index}`}
      data-section-type="category"
    >
      <header>
        <h2 className="text-3xl font-bold text-slate-900">{category.title}</h2>
        <p className="mt-2 text-sm text-slate-500">Товаров: {category.items.length}</p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {category.items.map((product) => (
          <ProductCard key={product.id} product={product} contextLabel={category.title} />
        ))}
      </div>
    </section>
  );
};

const SearchBar = ({
  query,
  onChange,
  total,
  onReset,
}: {
  query: string;
  onChange: (value: string) => void;
  total: number;
  onReset?: () => void;
}) => (
  <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
    <label className="text-sm font-semibold text-white/80" htmlFor="catalog-search">
      Найдите модель, серию или назначение
    </label>
    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.65" y1="16.65" x2="21" y2="21" />
          </svg>
        </span>
        <input
          id="catalog-search"
          value={query}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Например: котёл ЖМЗ, горелка, полотенцесушитель"
          className="w-full rounded-2xl border border-white/20 bg-white/10 pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur focus:border-gaskotel-secondary focus:outline-none focus:ring-2 focus:ring-gaskotel-secondary/40"
          type="search"
        />
      </div>
      <div className="flex flex-col gap-2 text-xs text-white/70 sm:items-end">
        <div>{query ? `Найдено ${total} позиций` : `Доступно ${total} товаров`}</div>
        {query && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-white hover:text-gaskotel-secondary"
          >
            Очистить поиск
          </button>
        )}
      </div>
    </div>
  </div>
);

const BackToTop = () => (
  <a
    href="#catalog-top"
    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-gaskotel-secondary hover:text-gaskotel-secondary"
  >
    ↑ Вернуться к началу
  </a>
);

export type { CatalogCategory, Product };

const CatalogContent = ({ categories }: CatalogContentProps) => {
  const normalizedCategories = useMemo(() => normalizeCategories(categories), [categories]);
  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string>("category-0");
  const [activeSubId, setActiveSubId] = useState<string | null>(null);

  const filteredCategories = useMemo(
    () => filterByQuery(normalizedCategories, query),
    [normalizedCategories, query]
  );

  const totalProducts = useMemo(
    () => filteredCategories.reduce((acc, category) => acc + countProducts(category), 0),
    [filteredCategories]
  );

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-catalog-section]"));
    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          const sectionId = target.dataset.sectionId;
          const sectionType = target.dataset.sectionType;
          if (!sectionId || !sectionType) return;

          if (sectionType === "subcategory") {
            setActiveSubId(sectionId);
            setActiveCategoryId(target.dataset.parentId ?? sectionId.split("-sub-")[0]);
          } else {
            setActiveCategoryId(sectionId);
            setActiveSubId(null);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0.2,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [filteredCategories]);

  return (
    <div className="bg-slate-50 py-16" id="catalog-top">
      <div className="container mx-auto px-4">
        <section className="mb-12 overflow-hidden rounded-[32px] bg-white p-8 shadow-sm lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-gaskotel-secondary/10 px-4 py-1 text-sm font-semibold text-gaskotel-secondary">
                Каталог продукции
                <span className="h-2 w-2 rounded-full bg-gaskotel-secondary" />
              </span>
              <h1 className="mt-6 text-4xl font-extrabold text-slate-900 md:text-5xl">
                Оборудование и товары ЖМЗ
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Более {totalProducts} позиций: от отопительных котлов и газогорелочных устройств до товаров для дома,
                сада и ремонта. Используйте поиск и список категорий для быстрого перехода к нужному разделу.
              </p>
              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <a
                  href="tel:+74952216688"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-gaskotel-secondary px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-gaskotel-secondary/90"
                >
                  Позвонить отделу продаж
                </a>
                <a
                  href="mailto:zmz@gaskotel.ru?subject=Запрос%20каталога"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-gaskotel-secondary hover:text-gaskotel-secondary"
                >
                  Получить консультацию
                </a>
              </div>
              <dl className="mt-8 grid gap-4 text-sm text-slate-500 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-400">Позиций в каталоге</dt>
                  <dd className="mt-2 text-2xl font-bold text-slate-900">{totalProducts}</dd>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                  <dt className="text-xs uppercase tracking-wide text-slate-400">Категорий и разделов</dt>
                  <dd className="mt-2 text-2xl font-bold text-slate-900">{filteredCategories.length}</dd>
                </div>
              </dl>
            </div>
            <div className="relative">
              <div className="absolute -right-4 top-4 h-32 w-32 rounded-full bg-gaskotel-secondary/30 blur-3xl" />
              <div className="relative h-full rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white shadow-2xl">
                <p className="text-sm uppercase tracking-[0.4em] text-white/50">ЖМЗ</p>
                <h3 className="mt-4 text-3xl font-bold leading-tight">Инжиниринговые решения для отопления</h3>
                <p className="mt-4 text-sm text-white/70">
                  Скомплектуем поставку, подготовим КП и возьмём на себя подбор оборудования под задачу.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-white/80">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      1
                    </span>
                    Личный менеджер и быстрая выгрузка прайса.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      2
                    </span>
                    Сертифицированная продукция, гарантия ЖМЗ.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                      3
                    </span>
                    Логистика по России и СНГ.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-10 space-y-4">
          <SearchBar query={query} onChange={setQuery} total={totalProducts} onReset={() => setQuery("")} />
          <CategoryNavMobile
            categories={filteredCategories}
            activeCategoryId={activeCategoryId}
            activeSubId={activeSubId}
          />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <CategoryNavDesktop
            categories={filteredCategories}
            activeCategoryId={activeCategoryId}
            activeSubId={activeSubId}
          />

          {filteredCategories.length > 0 ? (
            <div className="space-y-16">
              {filteredCategories.map((category, index) => (
                <CategorySection key={`${category.title}-${index}`} category={category} index={index} />
              ))}
              <div className="flex justify-center">
                <BackToTop />
              </div>
            </div>
          ) : (
            <div className="rounded-[32px] border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                ?
              </div>
              <p className="mt-6 text-lg font-semibold text-slate-800">Мы не нашли товары по запросу “{query}”.</p>
              <p className="mt-2 text-sm text-slate-500">
                Попробуйте изменить формулировку или вернитесь к полному каталогу.
              </p>
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-2xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-gaskotel-secondary hover:text-gaskotel-secondary"
                >
                  Сбросить поиск
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogContent;
