"use client";

import { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [chatMessages, setChatMessages] = useState<{ sender: string; message: string }[]>([
    { sender: "Support", message: "Hello! How can I help you?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();
        setProducts(data);
        const uniqueCategories = Array.from(new Set(data.map((p) => p.category)));
        setCategories(["All", ...uniqueCategories]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCart(false);
        setShowUserMenu(false);
        setShowChat(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) return <p className="p-4 text-yellow-500">Loading products...</p>;

  // Filter products by category AND search
  const filteredProducts = products
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const addToCart = (product: Product) => setCartItems([...cartItems, product]);

  const handleSendMessage = () => {
    if (chatInput.trim() === "") return;
    setChatMessages([...chatMessages, { sender: "You", message: chatInput }]);
    setChatInput("");
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  // Mutually exclusive dropdown toggles
  const handleCartToggle = () => {
    setShowCart(!showCart);
    setShowUserMenu(false);
    setShowChat(false);
  };
  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
    setShowCart(false);
    setShowChat(false);
  };
  const handleChatToggle = () => {
    setShowChat(!showChat);
    setShowCart(false);
    setShowUserMenu(false);
  };

  return (
    <div className="min-h-screen bg-black text-white" ref={dropdownRef}>
      {/* NavBar */}
      <NavBar
        cartItems={cartItems}
        showCart={showCart}
        showUserMenu={showUserMenu}
        showChat={showChat}
        onCartClick={handleCartToggle}
        onUserClick={handleUserMenuToggle}
        onChatClick={handleChatToggle}
        onLogout={handleLogout}
        chatMessages={chatMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendMessage={handleSendMessage}
      />

      {/* Search + Filter */}
      <div className="pt-28 px-6 max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:border-yellow-500"
        />

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Product Grid */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-yellow-500 text-black py-1 rounded hover:bg-yellow-400 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="text-gray-400 col-span-full text-center mt-8">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
