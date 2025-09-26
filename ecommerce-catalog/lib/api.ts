// lib/api.ts
import { Product } from "../types/product";

// Get products with optional limit & skip (for pagination)
export async function getProducts(limit = 10, skip = 0): Promise<Product[]> {
  // FakeStoreAPI does not support skip directly
  // so we fetch all and slice manually
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("Failed to get products");
  }

  const data: Product[] = await res.json();
  return data.slice(skip, skip + limit);
}

// Get categories
export async function getCategories(): Promise<string[]> {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  if (!res.ok) {
    throw new Error("Failed to get categories");
  }

  return res.json();
}

// Get single product by ID
export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to get product with id ${id}`);
  }

  return res.json();
}
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
  );
  if (!res.ok) {
    throw new Error(`Failed to get products for category ${category}`);
  }

  return res.json();
}
