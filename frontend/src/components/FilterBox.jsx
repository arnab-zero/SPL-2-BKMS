import { useState } from "react";
import GraphVisualization from "./GraphVisualization";

const FilterBox = ({ setNewGraph, nodeDetails }) => {
  const [topicName, setTopicName] = useState("");
  const [graphData, setGraphData] = useState([]);

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
      setNewGraph(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="SearchGraph flex justify-center py-5 items-center">
        <div>
          <label className="text-lg font-semibold mr-2">
            Search Graph by Topic:{" "}
          </label>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter topic name"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <button
            className="btn btn-outline font-semibold"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div id="graph">
        {graphData.length > 0 ? (
          <GraphVisualization data={graphData} nodeDetails={nodeDetails} />
        ) : (
          <p className="text-xl text-center"></p>
        )}
      </div>
    </div>
  );
};

export default FilterBox;
