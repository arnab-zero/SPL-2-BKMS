import { useState } from "react";

const FilterBox = ({ setGraphData }) => {
  const [topicName, setTopicName] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/data/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topicName }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setGraphData(data);
      console.log("Data from filter box: ", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="SearchGraph flex justify-center py-5 items-center">
        <div>
          <label className="text-xl font-semibold mr-2">
            Search Graph by Topic:{" "}
          </label>
        </div>
        <div className="items-center">
          <input
            type="text"
            placeholder="Enter topic name"
            className="border rounded-xl p-2 mr-2"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <button
            className="btn bg-[#e69e40] text-white font-semibold rounded-2xl px-4 py-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
