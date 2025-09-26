import Image from "next/image";
import { Product } from "../types/product";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-4 flex flex-col justify-between">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image || "/fallback-image.png"}
          alt={product.title}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <h2 className="text-lg font-semibold truncate">{product.title}</h2>
      <p className="text-sm text-gray-400">{product.category}</p>
      <p className="text-xl font-bold text-blue-400">${product.price}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}
