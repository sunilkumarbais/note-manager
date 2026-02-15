import { useNavigate } from "react-router-dom";
import Audit from "../api/Audit";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = Audit();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());

    try {
      const res = await login(value);
      const body = await res.json();
      if(!res.ok){
        throw new Error(body.message);
      }
      navigate("/")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="userName" className="text-sm text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter your username"
              className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/30"
          >
            Login
          </button>

          {/* Error */}
          {error && <p className="text-center text-red-300">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
