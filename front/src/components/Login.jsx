import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const requestBody = { email, password };
    console.log("📤 Sending request:", requestBody);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("📥 Response received:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Successfully!");
        navigate("/dashboard");
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (error) {
      alert("Failed to connect to server. Please try again later.");
      console.error("❌ Login Error:", error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <section className="h-screen flex items-center justify-center bg-white">
      <div className="bg-sky-500 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center text-black font-bold">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-black">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-black">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-black py-2 rounded-md hover:bg-white hover:font-bold hover:text-blue-500 transition duration-200"
          >
            Sign in
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </section>
  );
}
