import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { login, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    logout();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", formData);
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
          <p className="text-xl font-semibold">Create a new account</p>
          <p>Enter the below details to create an account</p>
        </div>

        <form onSubmit={handleSubmit} className=" space-y-4">
          <input
            className="w-full p-2 border border-gray-600  rounded-sm"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <input
            className="w-full p-2 border border-gray-600  rounded-sm"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <input
            className="w-full p-2 border border-gray-600  rounded-sm"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button
            className="bg-emerald-600 text-white px-4 py-2 rounded-sm"
            disabled={loading}
          >
            {loading ? "Creating account...." : "Sign Up"}
          </button>
        </form>

        {error && (
          <div>
            <p className="text-rose-500">{error}</p>
          </div>
        )}

        <div>
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline underline-offset-4 text-emerald-600"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
