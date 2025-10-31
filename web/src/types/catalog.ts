export interface Category {
  id: string; // slug
  title: string;
  count?: number;
  parentId?: string;
}

export interface Product {
  id: string; // slug
  title: string;
  price: number; // raw number, format on UI
  currency: 'RUB';
  categoryId: string;
  sku?: string;
  description?: string;
  attributes?: Record<string, string | number | boolean>;
  images?: string[];
  availability?: 'in_stock' | 'out_of_stock' | 'preorder';
  tags?: string[];
}

export interface CatalogData {
  categories: Category[];
  products: Product[];
  generatedAt?: string;
}


