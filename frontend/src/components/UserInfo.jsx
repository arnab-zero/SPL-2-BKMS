import axios from "axios";
import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";

import { MdEmail } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const UserInfo = ({ onEditProfile }) => {
  const { user, setUser } = useContext(AuthContext);
  const email = user.email;
  // console.log("From update: ", email);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/search/${email}`
        );
        setUser(response.data[0]); // Set the user object from the response data
        // console.log("User info: ", response.data[0]);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    // Check if the email is available before fetching user data
    if (email) {
      fetchUserData();
    }
  }, [email]);

  const displayName = user?.displayName || "";
  const photoURL = user?.userImageLink || "";
  const workplace = user?.workplace || "";
  const location = user?.location || "";

  // console.log("URL: ", photoURL);

  return (
    <div className="bg-white mt-5 p-6 py-10 rounded-lg shadow-lg text-center flex flex-col h-full max-h-[500px]">
      <div className="flex-grow flex flex-col justify-center">
        <img
          src={`${photoURL}`}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-12"
        />
        <h2 className="text-2xl font-bold mb-2">{displayName}</h2>
        <div className="text-gray-600 mb-2 flex gap-2 items-center justify-center">
          <MdEmail className="text-black" /> <span>{email}</span>
        </div>
        <p className="flex gap-2 items-center justify-center text-gray-600 mb-2">
          <MdWork className="text-black" />
          <span>
            Works at: {workplace || "Update profile to add workplace"}
          </span>
        </p>
        <p className="flex gap-2 items-center justify-center text-gray-600 mb-2">
          <IoLocationSharp />
          <span>From: {location || "Update profile to add location"}</span>
        </p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onEditProfile}
          className="btn btn-outline flex gap-2 items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-auto w-[25%]"
        >
          <FaEdit />
          <span>Update Profile</span>
        </button>
      </div>
    </div>
  );
};

export default UserInfo;

