import { useState, useEffect } from "react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true); 
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && isLogin) {
      window.location.href = "/catalog"; 
    }
  }, [isLogin]);

  const validateName = (n: string) => /^[A-Za-z]+\s[A-Za-z]+$/.test(n);
  const validatePhone = (p: string) => /^\d+$/.test(p);
  const validateEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSignUp = () => {
    if (!validateName(name)) return alert("Enter first and last name in letters only");
    if (!validatePhone(phone)) return alert("Phone must be digits only");
    if (!validateEmail(email)) return alert("Enter a valid email");
    if (!country) return alert("Select your country");

    const user = { name, phone, email, country };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Account created!");
    window.location.href = "/catalog";
  };

  const handleLogin = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return alert("No account found. Please sign up.");
    const user = JSON.parse(storedUser);

    if (user.name === name) {
      window.location.href = "/catalog";
    } else {
      alert("Account not found. Please sign up.");
      setIsLogin(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-6 text-yellow-500"> MUJOS SHOP</h1>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {isLogin ? <h2 className="text-2xl font-semibold mb-4">Log In</h2> :
          <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            >
              <option value="">Select Country</option>
              <option value="Kenya">Kenya</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full mb-3"
        />

        {isLogin ? (
          <button
            onClick={handleLogin}
            className="bg-yellow-500 text-white px-4 py-2 rounded w-full mb-2"
          >
            Log In
          </button>
        ) : (
          <button
            onClick={handleSignUp}
            className="bg-yellow-500 text-white px-4 py-2 rounded w-full mb-2"
          >
            Sign Up
          </button>
        )}

        <p className="text-center text-sm text-gray-900 mt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-900 cursor-pointer underline"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
}
