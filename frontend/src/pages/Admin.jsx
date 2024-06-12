import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [admin, setAdmin] = useState({
    name: "Admin Name",
    email: "admin@example.com",
    workplace: "Admin Workplace",
    location: "Admin Location",
    photoURL: "https://via.placeholder.com/150",
  });
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);

  useEffect(() => {
    // Fetch pending papers data
    const fetchPapers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/pendingPapers"
        );
        setPapers(response.data);
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };

    fetchPapers();
  }, []);

  const handleReadAbstract = (paper) => {
    setSelectedPaper(paper);
  };

  const handleApprove = (paper) => {
    // Approve paper logic here
    console.log("Approved paper:", paper._id);
  };

  const handleReject = (paper) => {
    // Reject paper logic here
    console.log("Rejected paper:", paper._id);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <aside className="w-full md:w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin Info</h2>
        <div className="mb-4">
          <img
            src={admin.photoURL}
            alt="Admin"
            className="rounded-full w-24 h-24 mb-4"
          />
          <p>Name: {admin.name}</p>
          <p>Email: {admin.email}</p>
          <p>Workplace: {admin.workplace}</p>
          <p>Location: {admin.location}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Charts</h2>
          <div className="bg-gray-700 h-64 mb-4"></div>
          <div className="bg-gray-700 h-64 mb-4"></div>
        </div>
      </aside>
      <main className="flex-1 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Pending Papers</h2>
        <div className="overflow-auto max-h-screen">
          <ul className="divide-y divide-gray-200">
            {papers.map((paper) => (
              <li
                key={paper.id}
                className="flex justify-between items-center p-4 bg-white mb-2 rounded shadow-md"
              >
                <div>
                  <h3 className="text-xl font-semibold">{paper.title}</h3>
                  <p>Topic: {paper.topic}</p>
                  <p>Paper ID: {paper._id}</p>
                  <p>Author: {paper.author}</p>
                  <p>
                    Publication Date:{" "}
                    {new Date(paper.publicationDate).toLocaleDateString()}
                  </p>
                  <a
                    href={paper.link}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Paper
                  </a>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReadAbstract(paper)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Read Abstract
                  </button>
                  <button
                    onClick={() => handleApprove(paper)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(paper)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      {selectedPaper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              {selectedPaper.title} - Abstract
            </h3>
            <p className="mb-4">{selectedPaper.abstract}</p>
            <button
              onClick={() => setSelectedPaper(null)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;