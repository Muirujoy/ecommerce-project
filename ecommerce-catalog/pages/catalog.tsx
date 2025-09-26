import { useState, useEffect, useCallback } from "react";
import { Product } from "../types/product";
import { getProducts, getCategories } from "../lib/api";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/NavBar";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Filters
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const loadProducts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newProducts = await getProducts(10, (page - 1) * 10);
      setProducts(prev => [...prev, ...newProducts]);
      setHasMore(newProducts.length > 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts, page]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const filteredProducts = products
    .filter(p => (category ? p.category === category : true))
    .filter(p => (search ? p.title.toLowerCase().includes(search.toLowerCase()) : true))
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (product: Product) => setCart(prev => [...prev, product]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="h-screen overflow-y-auto" onScroll={handleScroll}>
      <Navbar
        cart={cart}
        onRemoveFromCart={index => setCart(prev => prev.filter((_, i) => i !== index))}
      />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-5xl font-bold text-yellow-500 mb-6">MUJOS SHOP</h1>
        <FilterBar
                  categories={categories}
                  selectedCategory={category}
                  onCategoryChange={setCategory}
                  sort={sort}
                  onSortChange={setSort}
                  search={search}
                  onSearchChange={setSearch} quantity={""} onQuantityChange={function (value: string): void {
                      throw new Error("Function not implemented.");
                  } } gender={""} onGenderChange={function (value: string): void {
                      throw new Error("Function not implemented.");
                  } }        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
        {loading && <div className="text-center py-4">Loading...</div>}
        {!hasMore && <div className="text-center py-4">No more products</div>}
      </main>
    </div>
  );
}
