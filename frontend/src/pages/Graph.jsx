import { useState, useEffect } from "react";
import GraphVisualization from "../components/GraphVisualization";
import FilterBox from "../components/FilterBox";
import PaginatedPaperList from "../components/PaginatedPaperList";
import GraphLegend from "./GraphLegend";
import PaperInfoModal from "../components/PaperInfoModal";

const Graph = () => {
  const [graphData, setGraphData] = useState([]);
  const [nodeDetails, setNodeDetails] = useState(null);
  const [newGraph, setNewGraph] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/data")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data); // Add this line
        setGraphData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleNodeClick = (details) => {
    setNodeDetails(details);
    setIsModalOpen(true);
  };

  console.log("Node details: ", nodeDetails);
  console.log("Graph data in graph: ", graphData);

  return (
    <div>
      <div className="grid grid-cols-8 mx-[7%]">
        <div className="my-10 col-span-5">
          <div className="Graph">
            <h1 className="text-3xl font-bold py-1 text-center">
              Knowledge Graph
            </h1>
            <FilterBox setGraphData={setGraphData} />
            <div className="w-full flex justify-center">
              <GraphLegend />
            </div>
            <div className="mt-10">
              {graphData.length > 0 ? (
                <div className={` ${newGraph ? "hidden" : "visible"}`}>
                  <GraphVisualization
                    data={graphData}
                    setNodeDetails={handleNodeClick}
                  />
                </div>
              ) : (
                <div className="relative left-1/2 top-1/2">
                  <span className="loading loading-bars loading-lg"></span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <PaginatedPaperList graphData={graphData} />
        </div>
      </div>
      {/* Shows paper detail when a node is clicked in graph */}
      <PaperInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nodeDetails={nodeDetails}
      />
    </div>
  );
};

export default Graph;
