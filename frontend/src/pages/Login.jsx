import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/Auth";

const URL = "https://mvp-project-backend.onrender.com/login";

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const res_data = await response.json();
      if (res_data.token) {
        console.log("Token received:", res_data.token);
        storeTokenInLS(res_data.token);
        setUser({ email: '', password: '' });
        navigate("/");  // navigate to home page or desired route on success
      } else {
        console.log("Token not received in response:", res_data);
      }

    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-600">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="./login.png"
            alt="login-images"
            className="w-64 h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 ">
          <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
