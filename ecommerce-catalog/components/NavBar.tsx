import { FaShoppingCart, FaUserCircle, FaCommentDots } from "react-icons/fa";

interface NavBarProps {
  cartItems: { id: number; title: string; price: number; image: string }[];
  showCart: boolean;
  showUserMenu: boolean;
  showChat: boolean;
  onCartClick: () => void;
  onUserClick: () => void;
  onChatClick: () => void;
  onLogout: () => void;
  chatMessages?: { sender: string; message: string }[]; // optional for chat dropdown
  chatInput?: string;
  setChatInput?: (val: string) => void;
  handleSendMessage?: () => void;
}

export default function NavBar({
  cartItems,
  showCart,
  showUserMenu,
  showChat,
  onCartClick,
  onUserClick,
  onChatClick,
  onLogout,
  chatMessages,
  chatInput,
  setChatInput,
  handleSendMessage,
}: NavBarProps) {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <h1 className="text-3xl font-extrabold text-yellow-500">MUJOS SHOP</h1>

        <div className="flex items-center gap-6">
          {/* Cart */}
          <div className="relative">
            <FaShoppingCart
              size={24}
              className="hover:text-yellow-500 cursor-pointer transition"
              onClick={onCartClick}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}

            {showCart && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 text-white rounded shadow-lg p-4 z-50">
                <div className="flex justify-end mb-2">
                  <button
                    className="text-white hover:text-red-500 font-bold"
                    onClick={onCartClick}
                  >
                    ✕
                  </button>
                </div>
                {cartItems.length === 0 && <p className="text-gray-400">Your cart is empty.</p>}
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 mb-2">
                    <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-sm">{item.title}</p>
                      <p className="text-xs text-gray-300">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <FaUserCircle
              size={24}
              className="hover:text-yellow-500 cursor-pointer transition"
              onClick={onUserClick}
            />

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded shadow-lg p-2 z-50">
                <div className="flex justify-end mb-1">
                  <button
                    className="text-white hover:text-red-500 font-bold"
                    onClick={onUserClick}
                  >
                    ✕
                  </button>
                </div>
                <button
                  className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
                  onClick={() => alert("Settings")}
                >
                  Settings
                </button>
                <button
                  className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
                  onClick={() => alert("Track Order")}
                >
                  Track Order
                </button>
                <button
                  className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Chat */}
          <div className="relative">
            <FaCommentDots
              size={24}
              className="hover:text-yellow-500 cursor-pointer transition"
              onClick={onChatClick}
            />

            {showChat && chatMessages && handleSendMessage && setChatInput && (
              <div className="fixed bottom-4 right-4 w-80 bg-gray-800 text-white rounded shadow-lg p-4 flex flex-col z-50">
                <div className="flex justify-end mb-2">
                  <button
                    className="text-white hover:text-red-500 font-bold"
                    onClick={onChatClick}
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto max-h-48 mb-2">
                  {chatMessages.map((msg, idx) => (
                    <p key={idx}>
                      <span className="font-bold">{msg.sender}: </span>
                      {msg.message}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 px-2 py-1 rounded bg-gray-700 outline-none"
                    placeholder="Type a message..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

