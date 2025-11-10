import type { Metadata } from "next";
import catalogData from "@/lib/catalog-data.json";
import CatalogContent, { type CatalogCategory } from "./CatalogContent";

export const metadata: Metadata = {
  title: "Каталог продукции — ЖМЗ",
  description:
    "Полный каталог продукции Жуковского Машиностроительного Завода: газовые котлы, газогорелочные устройства, товары для отопления, дома и сада.",
};

const categories = catalogData.categories as CatalogCategory[];

export default function CatalogPage() {
  return <CatalogContent categories={categories} />;
}
