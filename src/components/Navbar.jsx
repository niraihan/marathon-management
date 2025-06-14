import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { FaBars, FaSignOutAlt, FaUser, FaRunning } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-600 font-semibold" : "hover:text-green-500"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/marathons"
          className={({ isActive }) =>
            isActive ? "text-green-600 font-semibold" : "hover:text-green-500"
          }
        >
          Marathons
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-green-600 font-semibold" : "hover:text-green-500"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4">
      {/* Left: Brand & Mobile Menu */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <FaBars size={20} />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-green-600 ml-2">
          <FaRunning className="text-green-500" />
          MarathonMS
        </Link>
      </div>

      {/* Center: Menu for Large Screens */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
      </div>

      {/* Right: ThemeToggle + Login/Register or User */}
      <div className="navbar-end flex items-center gap-2">
        <ThemeToggle />

        {!user ? (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-success btn-sm text-white">Register</Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div
                className="w-10 rounded-full ring ring-green-400 ring-offset-base-100 ring-offset-2"
                data-tooltip-id="user-tooltip"
                data-tooltip-content={user.displayName || "User"}
              >
                <img src={user?.photoURL || ""} alt="User" />
              </div>
              <Tooltip id="user-tooltip" />
            </label>

            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-48"
            >
              <li>
                <Link to="/my-profile" className="font-medium text-zinc-800 hover:text-green-600">
                  <FaUser /> My Profile
                </Link>
              </li>
              <li>
                <button onClick={logOut} className="font-medium text-zinc-800 hover:text-red-600">
                  <FaSignOutAlt /> Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
