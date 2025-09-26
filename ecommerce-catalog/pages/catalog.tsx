import Navbar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar"; 
import { useState, useEffect } from "react";
import { Product } from "../types/product";
import { fetchProducts } from "../lib/api";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  // Filters
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [quantity, setQuantity] = useState("");

  const [categories, setCategories] = useState<string[]>([]);

  // Fetch products
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setFiltered(data);
      setCategories([...new Set(data.map((p) => p.category))]);
    });
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...products];

    if (category) result = result.filter((p) => p.category === category);
    if (search) result = result.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    if (gender) result = result.filter((p) => p.gender === gender);
    if (quantity) {
      if (quantity === "1-10") result = result.filter((p) => p.quantity >= 1 && p.quantity <= 10);
      if (quantity === "11-50") result = result.filter((p) => p.quantity >= 11 && p.quantity <= 50);
      if (quantity === "50+") result = result.filter((p) => p.quantity > 50);
    }

    if (sort === "asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "desc") result.sort((a, b) => b.price - a.price);

    setFiltered(result);
  }, [category, sort, search, gender, quantity, products]);

  // Cart handlers
  const handleAddToCart = (product: Product) => setCart([...cart, product]);

  const handleRemoveFromCart = (index: number) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div>
      <Navbar cart={cart} onRemoveFromCart={handleRemoveFromCart} />

      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6 text-yellow-500">MUJOS SHOP</h1>

        {/* Filter Bar */}
        <FilterBar
                  categories={categories}
                  selectedCategory={category}
                  onCategoryChange={setCategory}
                  sort={sort}
                  onSortChange={setSort}
                  search={search}
                  onSearchChange={setSearch}
                  onGenderChange={setGender}
                  quantity={quantity}
                  onQuantityChange={setQuantity} gender={""}        />

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>
    </div>
  );
}
