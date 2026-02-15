import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Audit from "../../api/Audit";

const Navbar = () => {
  const navigate = useNavigate();
  const { checkUser } = Audit();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function fetchDb() {
      try {
        const res = await checkUser();

        if (!res.ok) {
          setIsAuth(false);
          return;
        }

        const body = await res.json();
        setIsAuth(body?.isAuth);
      } catch (err) {
        console.error(err);
        setIsAuth(false)
      }
    };
    
    fetchDb();
  }, [checkUser]);

  return (
    <header className="sticky top-0 z-50 bg-gray-900 shadow-lg">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-4 text-gray-200">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Note App
        </h1>

        {/* Middle Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition duration-300 hover:text-blue-400 ${
                isActive ? "text-blue-500 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/create-note"
            className={({ isActive }) =>
              `transition duration-300 hover:text-blue-400 ${
                isActive ? "text-blue-500 font-semibold" : ""
              }`
            }
          >
            Create Note
          </NavLink>

          <NavLink
            to="/all-notes"
            className={({ isActive }) =>
              `transition duration-300 hover:text-blue-400 ${
                isActive ? "text-blue-500 font-semibold" : ""
              }`
            }
          >
            All Notes
          </NavLink>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          {!isAuth ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition duration-300 cursor-pointer"
              >
                SignUp
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition duration-300 shadow-md hover:shadow-blue-500/30 cursor-pointer"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-300 cursor-pointer"
              >
                Profile
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
