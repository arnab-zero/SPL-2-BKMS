import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";

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
  const rewardPoints = user?.rewardPoints || 0;
  const workplace = user?.workplace || "";
  const location = user?.location || "";
  const paperSubmitted = user?.paperSubmitted || 0;
  const paperApproved = user?.paperSubmitted - user?.paperRejected || 0;

  // console.log("URL: ", photoURL);

  return (
    <div className="bg-white mt-5 p-6 py-10 rounded-lg shadow-lg text-center flex flex-col h-full max-h-[500px]">
      <div className="flex-grow flex flex-col justify-center">
        <img
          src={`${photoURL}`}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">Username: {displayName}</h2>
        <p className="text-gray-600 mb-2">User Email: {email}</p>
        <p className="text-gray-800 font-semibold">
          Reward Points: {rewardPoints}
        </p>
        <p className="text-gray-600 mb-2">
          Works at: {workplace || "Update profile to add workplace"}
        </p>
        <p className="text-gray-600 mb-2">
          From: {location || "Update profile to add location"}
        </p>
        <p className="text-gray-600 mb-2">
          Number of submitted papers: {paperSubmitted}
        </p>
        <p className="text-gray-600 mb-2">
          Number of approved papers: {paperApproved}
        </p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onEditProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-auto w-[25%]"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
