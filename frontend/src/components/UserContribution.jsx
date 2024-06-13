import { useContext, useEffect, useState } from "react";
import ArchivePaper from "./ArchivePaper"; // Assume ArchivePaper is in the same directory
import { AuthContext } from "../contexts/AuthProviderContext";
import axios from "axios";

const UserContribution = () => {
  const [papers, setPapers] = useState([]);
  const userInfo = useContext(AuthContext);
  const email = userInfo.user.email;
  // console.log("From contribution: ", email);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/submittedPapers/${email}`
        );
        console.log("Response: ", response);
        console.log("Data: ", response.data);
        setPapers(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };
    if (email) {
      fetchPapers();
    }
  }, [email]); // Add email to the dependency array

  return (
    <div className="max-h-[720px] overflow-y-auto overflow-x-hidden px-4 mt-5">
      <div className="flex flex-col items-center">
        {papers.length > 0 ? (
          papers.map((paper, index) => (
            <ArchivePaper
              key={index}
              paperName={paper.title}
              paperTopic={paper.topic}
              authors={paper.author}
              submissionDate={paper.createdAt}
              status={paper.status}
            />
          ))
        ) : (
          <p>No papers found.</p>
        )}
      </div>
    </div>
  );
};

export default UserContribution;