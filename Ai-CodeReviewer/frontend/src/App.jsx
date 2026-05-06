import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  return (
    <Routes>
      <Route
        path="/login"
        element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!token ? <Register setToken={setToken} /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
