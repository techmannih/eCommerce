import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Login submitted:", formData);
    // You can send the data to your authentication server or perform client-side authentication
  };

  return (
    <div className="max-sm:mx-6 mt-24">
      <h2 className="text-4xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Password"
            required
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="">
          {" "}
          New User?
          <Link
            to="/register"
            className="text-sm text-blue-500 hover:underline"
          >
            Create an Account
          </Link>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-black text-white m-7 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:shadow-outline-blue active:bg-gray-800"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
