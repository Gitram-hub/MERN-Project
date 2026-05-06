import { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      setToken(res.data.token);
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      {/* Error Popup */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-slide-in">
          <span>{error}</span>
          <button
            onClick={() => setError("")}
            className="text-white hover:text-gray-200 font-bold text-xl"
          >
            ×
          </button>
        </div>
      )}

      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg w-96 space-y-4"
      >
        <h2 className="text-white text-2xl font-semibold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 text-white">
          Login
        </button>

        <p className="text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:text-blue-400">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
