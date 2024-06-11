import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { AuthContext } from "../contexts/AuthProviderContext";

const UpdateProfileModal = ({ user, onClose, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [countryOptions, setCountryOptions] = useState([]);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const userInfo = useContext(AuthContext);
  const email = userInfo.user.email;
  console.log("From update: ", email);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://api.first.org/data/v1/countries"
        );
        const data = response.data;

        if (data.status === "OK") {
          const countries = Object.values(data.data).map((country) => ({
            value: country.country,
            label: country.country,
          }));
          setCountryOptions(countries);
        } else {
          console.error("Failed to fetch countries");
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
    console.log(e.target);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setError("");
    setUpdatedUser({ ...updatedUser, location: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUserData = {
        displayName: updatedUser.displayName,
        workplace: updatedUser.workplace,
        location: updatedUser.location,
        userImageLink: updatedUser.photoURL, // Change this line
      };

      const response = await axios.put(
        `http://localhost:8080/api/user/${email}`,
        updatedUserData
      );
      console.log("User updated successfully:", response.data);
      window.location.reload();
      onSave(updatedUserData); // Call the onSave callback with the updated user data
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="displayName"
              value={updatedUser?.displayName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Workplace: </label>
            <input
              type="text"
              name="workplace"
              value={updatedUser?.workplace}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <Select
              value={selectedCountry}
              onChange={handleCountryChange}
              options={countryOptions}
              placeholder="Select a country..."
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={updatedUser?.photoURL}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border rounded-lg"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
