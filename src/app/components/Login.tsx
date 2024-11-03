"use client"; // This directive tells Next.js this is a client component

import { useState } from "react";
import { API_URL } from "../const";

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // 로그인 성공 시 JWT 토큰을 응답에서 받아서 localStorage에 저장
        const data = await response.json();

        if (data.status === "success" && data.token) {
          localStorage.setItem("token", data.token); // JWT 토큰을 localStorage에 저장
          onLoginSuccess();
        } else {
          console.error("Received undefined token from the server");
          setError("Login failed. Please try again.");
        }
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#013597]">
      <div className="w-80 p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="mb-4 text-gray-800 text-xl font-semibold">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 text-gray-900 text-base"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 text-gray-900 text-base"
        />

        <button
          onClick={handleLogin}
          className="w-full p-3 rounded bg-[#013597] text-white font-bold hover:bg-[#012a7f] transition-colors"
        >
          Login
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
