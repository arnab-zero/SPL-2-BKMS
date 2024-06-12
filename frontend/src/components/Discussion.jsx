import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Question from "./Question";
import { AuthContext } from "../contexts/AuthProviderContext";
import { useParams } from "react-router-dom";

const Discussion = () => {
  const { user } = useContext(AuthContext);
  const { email } = user;
  const [userData, setUserData] = useState(null);
  const [discussions, setDiscussions] = useState([]); // State to hold discussion data
  const { paperId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/search/${email}`
        );
        const userDataFromApi = response.data[0];
        setUserData(userDataFromApi);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [email]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/discussions/${paperId}`
        );
        setDiscussions(response.data); // Save discussion data to state
        // console.log("discussion: ", response.data);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };

    fetchDiscussions();
  }, [paperId]);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const content = e.target.question.value;

    console.log(paperId, email, userData?.userImageLink, content);
    const photoURL = userData?.userImageLink;

    const discussionData = {
      paperId,
      email,
      photoURL,
      content,
    };

    axios
      .post("http://localhost:8080/api/discussions", discussionData)
      .then((response) => {
        console.log("Question posted successfully:", response.data);
        setDiscussions((prevDiscussions) => [
          ...prevDiscussions,
          response.data,
        ]); // Update discussions with the new post
        e.target.reset();
      })
      .catch((error) => {
        console.error("Error posting question:", error);
      });
  };

  return (
    <div>
      <h1>Discussion</h1>
      <form action="" className="my-4" onSubmit={handleQuestionSubmit}>
        <textarea name="question" id="question"></textarea>
        <br />
        <input type="submit" value="Post" className="btn btn-outline" />
      </form>
      {discussions.map((discussion) => (
        <div key={discussion._id}>
          <Question discussion={discussion} />
        </div>
      ))}
    </div>
  );
};

export default Discussion;
