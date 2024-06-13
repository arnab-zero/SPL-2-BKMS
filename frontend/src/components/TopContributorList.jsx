import { useEffect, useState } from "react";
import axios from "axios";

const TopContributorsList = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/topContributers"
        );
        setContributors(response.data.slice(0, 10)); // Limit to top 10 contributors
      } catch (error) {
        console.error("Error fetching top contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  return (
    <div className="bg-white bg-opacity-70 p-6 rounded-lg border-2 border-slate-200 mt-5 w-[100%]">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Top Contributors
      </h2>
      <ul>
        {contributors.map((contributor) => (
          <li
            key={contributor._id}
            className="flex items-center justify-between p-4 mb-3 bg-gray-50 bg-opacity-70 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <div className="flex items-center">
              <img
                src={contributor.userImageLink}
                alt={contributor.displayName}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {contributor.displayName}
                </p>
                <p className="text-sm text-gray-600">{contributor.email}</p>
              </div>
            </div>
            <p className="text-lg font-semibold  text-[#efaf7a]">
              {contributor.rewardPoints} pts
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopContributorsList;
