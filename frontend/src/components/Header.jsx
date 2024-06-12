import { NavLink, useNavigate } from "react-router-dom";

import { IoHome } from "react-icons/io5";
import { FaRegPaperPlane } from "react-icons/fa";
import { PiGraphBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoStatsChartOutline } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";
import { userSignOut } from "../firebase/GoogleAuth";

const Header = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    userSignOut();
    console.log("User after logout: ", user);
    navigate("/login");
  };

  const navLinks = (
    <>
      <li
        className="tooltip tooltip-bottom text-2xl text-[#c1793f] mx-2"
        data-tip="Home"
      >
        <NavLink to="/">
          <IoHome />
        </NavLink>
      </li>
      <li
        className={`tooltip tooltip-bottom text-2xl text-[#c1793f] mx-2 ${
          user ? "visible" : "hidden"
        }`}
        data-tip="My Profile"
      >
        <NavLink to="/user">
          <FaRegUserCircle />
        </NavLink>
      </li>
      <li
        className="tooltip tooltip-bottom text-2xl text-[#c1793f] mx-2"
        data-tip="Submit Paper"
      >
        <NavLink to="/submit-paper">
          <FaRegPaperPlane />
        </NavLink>
      </li>
      <li
        className="tooltip tooltip-bottom text-2xl text-[#c1793f] mx-2"
        data-tip="View Knowledge Graph"
      >
        <NavLink to="/graph">
          <PiGraphBold />
        </NavLink>
      </li>
      <li
        className="tooltip tooltip-bottom text-2xl text-[#c1793f] mx-2"
        data-tip="Statistics"
      >
        <NavLink to="/statistics">
          <IoStatsChartOutline />
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar bg-[#DaB495] px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-3xl text-[#8d572b] font-bold">
            BKMS
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        {user ? (
          <div
            className="navbar-end text-lg font-semibold text-[#c1793f] cursor-pointer hover:text-[#95663f]"
            onClick={handleLogOut}
          >
            Log Out
          </div>
        ) : (
          <div className="navbar-end text-lg font-semibold text-[#c1793f]">
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
