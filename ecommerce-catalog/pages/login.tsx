"use client";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUserExists(true);
  }, []);

  const handleLogin = () => {
    const userData = { name };
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = "/catalog";
  };

  const handleSignup = () => {
    const userData = { name };
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = "/catalog";
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4">
      <h1 className="text-6xl font-extrabold text-yellow-500 mb-8">
        MUJOS SHOP
      </h1>

      {!userExists ? (
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Sign Up</h2>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-gray-800 text-white focus:outline-none"
          />
          <button
            onClick={handleSignup}
            className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400 transition"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Welcome Back!</h2>
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400 transition"
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
}
