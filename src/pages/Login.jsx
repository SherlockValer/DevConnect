import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await API.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="max-w-md p-8 space-y-4 border border-gray-950/20 rounded-sm shadow-sm">
        <h2 className="text-center text-3xl font-bold">
          Dev<span className="text-violet-700">Connect</span>
        </h2>

        <div className="space-y-4">
          <p className="text-xl font-semibold">Login to your account</p>
          <p>Enter your email below to login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border border-gray-600 rounded-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="w-full p-2 border border-gray-600 rounded-sm"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <button
            className="bg-violet-600 text-white px-4 py-2 rounded-sm"
            disabled={loading}
          >
            {loading ? "Logging in...." : "Login"}
          </button>
        </form>

        {error && (
          <div>
            <p className="text-rose-500">{error}</p>
          </div>
        )}

        <div>
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="underline underline-offset-4 text-violet-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
