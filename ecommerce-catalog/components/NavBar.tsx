import { Product } from "../types/product";
import { useState } from "react";
import { FaShoppingCart, FaComments, FaUser } from "react-icons/fa";

interface NavbarProps {
  cart: Product[];
  onRemoveFromCart: (index: number) => void;
}

export default function Navbar({ cart, onRemoveFromCart }: NavbarProps) {
  const [openPanel, setOpenPanel] = useState<"cart" | "chat" | "profile" | null>(null);

  const togglePanel = (panel: "cart" | "chat" | "profile") => {
    setOpenPanel(openPanel === panel ? null : panel);
  };

  return (
    <div className="relative">
      <nav className="flex justify-end items-center gap-4 p-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 shadow">
        <button
          onClick={() => togglePanel("cart")}
          className="flex items-center gap-1 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
        >
          <FaShoppingCart /> Cart ({cart.length})
        </button>
        <button
          onClick={() => togglePanel("chat")}
          className="flex items-center gap-1 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
        >
          <FaComments /> Chat
        </button>
        <button
          onClick={() => togglePanel("profile")}
          className="flex items-center gap-1 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
        >
          <FaUser /> Profile
        </button>
      </nav>

      {openPanel && (
        <div className="absolute top-16 right-4 w-96 bg-white border rounded shadow-lg p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold capitalize">{openPanel}</h2>
            <button onClick={() => setOpenPanel(null)} className="text-red-500 font-bold">X</button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {openPanel === "cart" && (
              <div>
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul className="space-y-2">
                    {cart.map((item, index) => (
                      <li key={index} className="flex justify-between items-center border-b pb-1">
                        <span>{item.title}</span>
                        <div className="flex gap-2 items-center">
                          <span>${item.price}</span>
                          <button
                            onClick={() => onRemoveFromCart(index)}
                            className="text-red-500 font-bold"
                          >
                            X
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {openPanel === "chat" && (
              <div>
                <p>Welcome to support! Type your message below:</p>
                <input
                  type="text"
                  className="border p-2 rounded w-full mt-2"
                  placeholder="Type a message..."
                />
              </div>
            )}

            {openPanel === "profile" && (
              <ul className="space-y-2">
                <li className="hover:underline cursor-pointer">Orders</li>
                <li className="hover:underline cursor-pointer">Settings</li>
                <li
                  className="hover:underline cursor-pointer text-red-500"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/auth";
                  }}
                >
                  Log Out
                </li>
              </ul>
            )}
          </div>
        </div>
      )}

      {openPanel && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setOpenPanel(null)}
        ></div>
      )}
    </div>
  );
}
