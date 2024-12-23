import { NavLink } from "react-router-dom";
import { useAuth } from "../store/Auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="text-2xl font-bold">
          <NavLink to="/" className="hover:text-gray-300">
            MVP_PROJECTS
          </NavLink>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className="hover:text-gray-300"
                activeClassName="text-yellow-400"
              >
                Home
              </NavLink>
            </li>
          
            <li>
              <NavLink
                to="/projects"
                className="hover:text-gray-300"
                activeClassName="text-yellow-400"
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className="hover:text-gray-300"
                activeClassName="text-yellow-400"
              >
                Dashboard
              </NavLink>
            </li>

            {isLoggedIn ? (
              <li>
                <NavLink
                  to="/logout"
                  className="hover:text-gray-300"
                  activeClassName="text-yellow-400"
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="hover:text-gray-300"
                    activeClassName="text-yellow-400"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/register"
                    className="hover:text-gray-300"
                    activeClassName="text-yellow-400"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
