import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaginatedPaperList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTopic, setSearchTopic] = useState('');
  const [currentPaginationGroup, setCurrentPaginationGroup] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/data');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/data/filter', { topic: searchTopic });
      setFilteredData(response.data);
      setCurrentPage(1);
      setCurrentPaginationGroup(0);
    } catch (error) {
      console.error('Error searching data:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextGroup = () => {
    setCurrentPaginationGroup((prevGroup) => prevGroup + 1);
    setCurrentPage((prevGroup + 1) * 5 + 1);
  };

  const handlePreviousGroup = () => {
    setCurrentPaginationGroup((prevGroup) => prevGroup - 1);
    setCurrentPage((prevGroup - 1) * 5 + 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginationStart = currentPaginationGroup * 5 + 1;
  const paginationEnd = Math.min((currentPaginationGroup + 1) * 5, totalPages);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Paper List</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by topic"
          value={searchTopic}
          onChange={(e) => setSearchTopic(e.target.value)}
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Search
        </button>
      </div>

      <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
        {currentItems.map((item) => (
          <li key={item.paper.identity.low} className="p-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">{item.paper.properties.title}</h2>
              <p className="text-gray-600">Topic: {item.topic.properties.name}</p>
              <p className="text-gray-600">Authors: {item.paper.properties.authors}</p>
              <p className="text-gray-600">Published on: {new Date(item.paper.properties.publicationDate).toLocaleDateString()}</p>
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
        {Array.from({ length: paginationEnd - paginationStart + 1 }, (_, index) => (
          <button
            key={paginationStart + index}
            onClick={() => handlePageChange(paginationStart + index)}
            className={`px-4 py-2 rounded ${currentPage === paginationStart + index ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {paginationStart + index}
          </button>
        ))}
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
