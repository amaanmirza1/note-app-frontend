import { useState } from "react";
import { login } from "../services/authService";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    console.log(form);
    await login(form);
    window.location.reload();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="p-6 bg-gray-800 rounded-xl text-white w-80">
        <h2 className="text-xl mb-4">Login 🔐</h2>

        <input
          placeholder="Username"
          className="w-full p-2 mb-2 bg-gray-700 rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;