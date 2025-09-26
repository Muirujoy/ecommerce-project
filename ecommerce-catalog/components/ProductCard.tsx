import { Product } from "../types/product";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void; // must be passed as prop
}

export default function ProductCard({ product, onAddToCart }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col">
      <img src={product.image} alt={product.title} className="h-40 mx-auto mb-2 object-contain" />
      <h2 className="font-semibold text-sm mt-2 truncate">{product.title}</h2>
      <p className="text-gray-500 text-xs">{product.category}</p>
      <p className="text-blue-600 font-bold mt-1">${product.price}</p>
      <button
        onClick={() => onAddToCart(product)} // important!
        className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
