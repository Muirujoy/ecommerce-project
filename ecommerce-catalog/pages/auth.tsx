import { useState } from "react";
import { useRouter } from "next/router";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false); // toggle form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle signup
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (!name || !email || !password) {
        setError("Please fill in all fields");
      } else {
        alert("Sign Up successful!");
        setIsLogin(true); // switch to login form
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (!name) {
        setError("Please enter your name");
      } else {
        alert(`Welcome back, ${name}!`);
        router.push("/catalog"); // redirect to Catalog
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {/* MUJOS SHOP Logo */}
<div className="flex justify-center mb-8">
  <svg
    width="300"
    height="80"
    viewBox="0 0 300 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontSize="36"
      fontWeight="900"
      fill="url(#goldGradient)"
      style={{ fontFamily: "Arial Black, sans-serif" }}
    >
      MUJOS SHOP
    </text>
    <defs>
      <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA500" />
      </linearGradient>
    </defs>
  </svg>
</div>


        {!isLogin ? (
          // Sign Up Form
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring focus:border-yellow-500 bg-gray-800 text-white"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring focus:border-yellow-500 bg-gray-800 text-white"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring focus:border-yellow-500 bg-gray-800 text-white"
              required
            />

            <button
              type="submit"
              className="bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
            >
              Sign Up
            </button>

            <p className="text-sm text-center mt-2 text-gray-300">
              Already have an account?{" "}
              <button
                type="button"
                className="text-yellow-500 underline hover:text-yellow-400"
                onClick={() => setIsLogin(true)}
              >
                Log In
              </button>
            </p>
          </form>
        ) : (
          // Login Form
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring focus:border-yellow-500 bg-gray-800 text-white"
              required
            />

            <button
              type="submit"
              className="bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 transition"
            >
              Log In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
