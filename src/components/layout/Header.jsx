import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useState } from "react";

export default function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-950/20 py-8 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-3xl font-bold">
          Dev<span className="text-violet-700">Connect</span>
        </Link>

        <div className="flex justify-center items-center gap-4">
          <Link
            to="/create-project"
            className={`text-xl py-2 px-4 rounded-sm hover:bg-emerald-600 hover:text-white ${
              location.pathname === "/create-project" ? "bg-emerald-600 text-white" : ""
            }`}
          >
            Create Project
          </Link>

          <Link
            to="/profile"
            className={`text-xl py-2 px-4 rounded-sm hover:bg-emerald-600 hover:text-white ${
              location.pathname === "/profile" ? "bg-emerald-600 text-white" : ""
            }`}
          >
            My Profile
          </Link>

          <div className="relative">
            <button
              className="w-10 h-10 rounded-full bg-gray-600 text-sm flex items-center justify-center hover:border-2 hover:border-emerald-600"
              onClick={() => setOpen((toggle) => !toggle)}
            >
              <img
                className="w-15 rounded-full"
                src={`https://placehold.co/100?text=${user.name[0]}`}
                alt={user.name}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-md ">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
