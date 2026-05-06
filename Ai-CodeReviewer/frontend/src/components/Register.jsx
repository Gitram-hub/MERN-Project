import { useState } from "react";
import axios from "axios";

function Register({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        password,
      });

      const loginRes = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      setToken(loginRes.data.token);
    } catch (err) {
      // Check if error is about email already existing
      const errorMessage = err.response?.data?.message || "";
      if (
        errorMessage.toLowerCase().includes("email") &&
        (errorMessage.toLowerCase().includes("exist") ||
          errorMessage.toLowerCase().includes("already") ||
          errorMessage.toLowerCase().includes("taken") ||
          errorMessage.toLowerCase().includes("duplicate"))
      ) {
        setError(
          "This email is already registered. Please login or use a different email."
        );
      } else {
        setError(errorMessage || "Registration failed. Please try again.");
      }
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
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg w-96 space-y-4"
      >
        <h2 className="text-white text-2xl font-semibold text-center">
          Register
        </h2>

        <input
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          Register
        </button>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:text-blue-400">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
