import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent page reload
  
    try {
      const response = await fetch("http://localhost:5555/api/login", {
        method: "POST", // Use POST instead of GET
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send credentials
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! Status: ${response.status}`);
      }
  
      localStorage.setItem("token", data.token); // Store JWT token
      navigate("/dashboard"); // Redirect on success
  
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
  };
  

 


  return (
    <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-green-800 p-5 dark:bg-none">
      <div className="absolute inset-0 bg-white dark:bg-[#121212] opacity-90"></div>
      <div className="relative z-10 w-full max-w-[520px] rounded-lg bg-white p-5 shadow-lg dark:bg-[rgb(29,29,29)]">
        <h2 className="text-2xl font-bold text-center mb-5">Sign In</h2>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mb-3"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
