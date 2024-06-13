import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaginatedPaperList = ({ graphData }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTopic, setSearchTopic] = useState("");
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);

  console.log("Graph data: ", graphData);

  useEffect(() => {
    setData(graphData);
  }, [graphData]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextGroup = () => {
    setCurrentPaginationGroup((prevGroup) => {
      const nextGroup = prevGroup + 1;
      setCurrentPage(nextGroup * 5 + 1);
      return nextGroup;
    });
  };

  const handlePreviousGroup = () => {
    setCurrentPaginationGroup((prevGroup) => {
      const previousGroup = prevGroup - 1;
      setCurrentPage(previousGroup * 5 + 1);
      return previousGroup;
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginationStart = currentPaginationGroup * 5 + 1;
  const paginationEnd = Math.min((currentPaginationGroup + 1) * 5, totalPages);

  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 py-5">Paper List</h1>

      <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
        {currentItems.map((item) => (
          <li
            key={item.paper.identity.low}
            className="p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {item.paper.properties.title}
              </h2>
              <p className="text-gray-600">
                Topic: {item.topic.properties.name}
              </p>
              <p className="text-gray-600">
                Authors: {item.paper.properties.authors}
              </p>
              <p className="text-gray-600">
                Published on:{" "}
                {new Date(
                  item.paper.properties.publicationDate
                ).toLocaleDateString()}
              </p>
              <div className="my-2">
                <button
                  className="text-lg font-semibold text-[#d49e47] underline"
                  onClick={() => {
                    const paper = item.paper;
                    navigate(`/discussion/${item.paper?.properties.arxivId}`, {
                      state: { paper },
                    });
                  }}
                >
                  View discussion on this paper
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-center space-x-2">
        {currentPaginationGroup > 0 && (
          <button
            onClick={handlePreviousGroup}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700"
          >
            Previous
          </button>
        )}
        {Array.from(
          { length: paginationEnd - paginationStart + 1 },
          (_, index) => (
            <button
              key={paginationStart + index}
              onClick={() => handlePageChange(paginationStart + index)}
              className={`px-4 py-2 rounded ${
                currentPage === paginationStart + index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {paginationStart + index}
            </button>
          )
        )}
        {paginationEnd < totalPages && (
          <button
            onClick={handleNextGroup}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PaginatedPaperList;
