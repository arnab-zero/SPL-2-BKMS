import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProviderContext";

const Admin = () => {
  const [admin, setAdmin] = useState(null);
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);

  const { user, setUser } = useContext(AuthContext);
  const email = user?.email;

  useEffect(() => {
    fetch(`http://localhost:8080/api/search/${email}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // console.log("Get response: ", data[0].userImageLink);
        setAdmin(data[0]);
        console.log("from header: ", data[0]);
      })
      .catch((error) => {
        console.log("Error occurred while fetching user: ", error.message);
      });
  }, [email]);

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

  const handleApprove = async (paper) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/paper/approve",
        { paperId: paper._id, topicName: paper.topic }
      );
      console.log("Approved paper:", paper._id);
      console.log("Approved paper response: ", response);
      window.location.reload();
      // Optionally, update the UI or state after successful approval
    } catch (error) {
      console.error("Error approving paper:", error);
    }
  };

  const handleReject = async (paper) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/paper/reject",
        { paperId: paper._id }
      );
      console.log("Rejected paper:", paper._id);
      console.log("Rejected paper response: ", response);
      window.location.reload();
      // Optionally, update the UI or state after successful rejection
    } catch (error) {
      console.error("Error rejecting paper:", error);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-3 min-h-screen">
      {/* Admin Info */}
      <aside className="col-span-2 bg-[#a57d5f] text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Info</h2>
        <div className="mb-4 ml-3">
          <img
            src={admin?.userImageLink}
            alt="Admin"
            className="rounded-full w-24 h-24 mb-4"
          />
          <p className="text-2xl font-semibold">{admin?.displayName}</p>
          <p>Email: {admin?.email}</p>
          <p>Workplace: {admin?.workplace}</p>
          <p>Location: {admin?.location}</p>
        </div>
        {/* <div>
          <h2 className="text-xl font-bold mb-4">Charts</h2>
          <div className="bg-gray-700 h-64 mb-4"></div>
          <div className="bg-gray-700 h-64 mb-4"></div>
        </div> */}
      </aside>

      {/* Pending Papers Section */}
      <main className="col-span-3 bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-4">Pending Papers</h2>
        <div className="overflow-auto max-h-screen">
          <ul className="divide-y divide-gray-200">
            {papers.length > 0 ? (
              papers.map((paper) => (
                <li
                  key={paper.id}
                  className="flex justify-between items-center p-4 bg-white mb-2 rounded shadow-md pr-3"
                >
                  <div>
                    <h3 className="text-2xl font-semibold">{paper.title}</h3>
                    <p className="text-[#d49e47]">Topic: {paper.topic}</p>
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
              ))
            ) : (
              <div className="flex justify-center">
                <h3>No pending papers</h3>
              </div>
            )}
          </ul>
        </div>
      </main>

      {/* Selected Paper Modal */}
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
