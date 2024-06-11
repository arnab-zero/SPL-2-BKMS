import { useState, useEffect } from "react";
import GraphVisualization from "../components/GraphVisualization";
// import DetailDrawer from "../components/DetailDrawer";
import FilterBox from "../components/FilterBox";
import Discussion from "../components/Discussion";
import PaperDetail from "../components/PaperDetail";
import { Link } from "react-router-dom";
import PaginatedPaperList from "../components/PaginatedPaperList";

const Graph = () => {
  const [graphData, setGraphData] = useState([]);
  const [nodeDetails, setNodeDetails] = useState(null);
  const [newGraph, setNewGraph] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/data")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Add this line
        setGraphData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <div className="grid grid-cols-8 mx-[7%]">
        <div className="my-10 col-span-5">
          <div className="Graph">
            <h1 className="text-2xl font-bold py-1 text-center">
              Knowledge Graph
            </h1>
            <FilterBox setNewGraph={setNewGraph} nodeDetails={nodeDetails} />
            {graphData.length > 0 ? (
              <div
                className={` ${newGraph ? "hidden" : "visible"}`}
              >
                <GraphVisualization
                  data={graphData}
                  setNodeDetails={setNodeDetails}
                />
              </div>
            ) : (
              <div className="relative left-1/2 top-1/2">
                <span className="loading loading-bars loading-lg"></span>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <PaginatedPaperList />
        </div>
      </div>
      <div className="mb-10">
        {nodeDetails && <PaperDetail nodeDetails={nodeDetails} />}
      </div>
    </div>
  );
};

export default Graph;
