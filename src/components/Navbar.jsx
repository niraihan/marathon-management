import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { FaBars, FaSignOutAlt, FaUser, FaRunning } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "text-base-content hover:text-primary";

  const navLinks = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/marathons" className={navLinkClass}>Marathons</NavLink></li>
      <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
      <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
      <li><NavLink to="/support" className={navLinkClass}>Support</NavLink></li>
      {user && (
        <li><NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink></li>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 py-2">
        {/* Left Side */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-base-content">
              <FaBars size={20} />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-200 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center md:gap-2 font-bold text-sm md:text-2xl text-primary md:ml-2">
            <FaRunning />
            MarathonPro
          </Link>
        </div>

        {/* Center Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end flex items-center gap-1 md:gap-2">
          <ThemeToggle />
          {!user ? (
            <>
              <Link to="/login" className="btn btn-outline btn-sm text-base-content hover:text-white hover:bg-primary">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm text-white">Register</Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div
                  className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user.displayName || "User"}
                >
                  <img src={user?.photoURL || ""} alt="User" />
                </div>
                <Tooltip id="user-tooltip" />
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-200 text-base-content rounded-box w-48"
              >
                <li>
                  <Link to="/my-profile" className="hover:text-primary">
                    <FaUser /> My Profile
                  </Link>
                </li>
                <li>
                  <button onClick={logOut} className="hover:text-red-500">
                    <FaSignOutAlt /> Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
