import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/user/create",
        { name, email, password },
        { withCredentials: true }
      );

      setMessage(response.data.message);
      navigate("/todos");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="w-full max-w-sm bg-[#d9d9d9] rounded-lg shadow-2xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-5">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm md:text-base font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm sm:text-sm md:text-base"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm sm:text-sm md:text-base"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="block w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm sm:text-sm md:text-base"
              />
              <img
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 cursor-pointer hover:scale-125"
                src={showPassword ? "https://www.svgrepo.com/show/326627/eye-outline.svg" : "https://www.svgrepo.com/show/380007/eye-password-hide.svg"}
                alt="Toggle Password Visibility"
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm md:text-base font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
                className="block w-full p-3 pr-10 border border-gray-300 rounded-lg shadow-sm sm:text-sm md:text-base"
              />
              <img
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-5 h-5 cursor-pointer hover:scale-125"
                src={showConfirmPassword ? "https://www.svgrepo.com/show/326627/eye-outline.svg" : "https://www.svgrepo.com/show/380007/eye-password-hide.svg"}
                alt="Toggle Confirm Password Visibility"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF5845] text-white py-3 rounded-lg hover:bg-[#FFA07A]"
          >
            Sign Up
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm md:text-base text-red-500">
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-gray-600 text-sm md:text-base">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
