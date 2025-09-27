import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
      <p className="text-gray-500 text-sm">{product.category}</p>
      <p className="text-green-600 font-bold mt-2">${product.price}</p>
    </div>
  );
}
