import { NavLink, useNavigate } from "react-router-dom";

import { IoHome } from "react-icons/io5";
import { FaRegPaperPlane } from "react-icons/fa";
import { PiGraphBold } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoStatsChartOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";
import { userSignOut } from "../firebase/GoogleAuth";
import { RiAdminLine } from "react-icons/ri";

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const email = user ? user.email : "";

  const handleLogOut = () => {
    userSignOut();
    console.log("User after logout: ", user);
    setUser(null);
    setUserInfo(null);
    navigate("/login");
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/search/${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // console.log("Get response: ", data[0].userImageLink);
        setUserInfo(data[0]);
        console.log("from header: ", data[0]);
      })
      .catch((error) => {
        console.log("Error occurred while fetching user: ", error.message);
      });
  }, [email]);

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
          userInfo?.role === "user" ? "visible" : "hidden"
        }`}
        data-tip="My Profile"
      >
        <NavLink to="/user">
          <FaRegUserCircle />
        </NavLink>
      </li>
      <li
        className={`tooltip tooltip-bottom text-2xl text-[#c1793f] mx-2 ${
          userInfo?.role === "admin" ? "visible" : "hidden"
        }`}
        data-tip="Admin"
      >
        <NavLink to="/admin">
          <RiAdminLine />
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
            className="navbar-end text-xl font-semibold text-[#c1793f] cursor-pointer hover:text-[#95663f]"
            onClick={handleLogOut}
          >
            Log Out
          </div>
        ) : (
          <div className="navbar-end text-xl font-semibold text-[#c1793f]">
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
