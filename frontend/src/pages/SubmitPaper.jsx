import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProviderContext";
import { Link } from "react-router-dom";

const LoginRegisterMessage = () => {
  return (
    <div className="flex justify-center">
      <h1>Login or Register to Submit Your Paper</h1>
      <Link to="/login" className="ml-4">
        Login
      </Link>
    </div>
  );
};

const SubmitPaper = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const user = useContext(AuthContext);
  const userInfo = user?.user;

  useEffect(() => {
    setUserLoggedIn(user);
  }, [user]);

  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    topic: "",
    title: "",
    author: "",
    email: userInfo ? userInfo.email : "",
    link: "",
    publicationDate: "",
    abstract: "",
  });

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/topics");
        const topicsData = response.data.map(
          (item) => item.topic.properties.name
        );
        setTopics(topicsData);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/submitPaper",
        formData
      );
      alert("Paper submitted successfully:", response.data);
    } catch (error) {
      alert("Error submitting paper!");
      console.error("Error submitting paper:", error);
    }

    e.target.reset();
  };

  if (!user) {
    return (
      <div className="my-[200px]">
        <LoginRegisterMessage />
      </div>
    );
  }

  return (
    <div>
      <div
        className={`grid grid-cols-4 my-10 mb-20 ${
          user ? "visible" : "hidden"
        }`}
      >
        <div className="col-start-2 col-end-4 flex flex-col">
          <h1 className="text-4xl font-bold py-4 text-center">
            Add Your Paper Into the Graph
          </h1>

          <form onSubmit={handleSubmit} className="">
            <label htmlFor="topic" className="text-xl font-medium leading-10">
              Choose Topic{" "}
            </label>
            <br />
            <select
              name="topic"
              id="topic"
              className="text-lg border-2 mb-4 w-full rounded-xl pl-4 py-4"
              value={formData.topic}
              onChange={handleChange}
              required
            >
              <option value="">Select Topic</option>
              {topics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="title" className="text-xl font-medium leading-10">
              Paper Title{" "}
            </label>
            <br />
            <input
              type="text"
              name="title"
              id="title"
              className="text-lg border-2 mb-4 w-full rounded-xl pl-4 py-4"
              placeholder="Paper Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="author" className="text-xl font-medium leading-10">
              Author(s) Name{" "}
            </label>
            <br />
            <input
              type="text"
              name="author"
              id="author-name"
              className="text-lg border-2 mb-4 w-full rounded-xl pl-4 py-4"
              placeholder="Author(s) Name"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="link" className="text-xl font-medium leading-10">
              Paper Link{" "}
            </label>
            <br />
            <input
              type="text"
              name="link"
              id="link"
              className="border-2 mb-4 w-full text-lg rounded-xl pl-4 py-4"
              placeholder="Paper Link"
              value={formData.link}
              onChange={handleChange}
              required
            />
            <br />
            <label
              htmlFor="publication-date"
              className="text-xl font-medium leading-10"
            >
              Publication Date{" "}
            </label>
            <br />
            <input
              type="date"
              name="publicationDate"
              id="publication-date"
              className="border-2 mb-4 w-full rounded-xl pl-4 py-4 text-lg"
              value={formData.publicationDate}
              onChange={handleChange}
              required
            />
            <br />
            <label
              htmlFor="abstract"
              className="text-xl font-medium leading-10"
            >
              Abstract{" "}
            </label>
            <br />
            <textarea
              name="abstract"
              className="resize-y block w-full px-4 py-4 mt-2 text-lg text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Paper abstract"
              value={formData.abstract}
              onChange={handleChange}
              required
            ></textarea>
            <br />
            <div className="flex justify-center mt-5">
              <input
                type="submit"
                value="Submit Paper"
                className="text-lg font-medium border-2 bg-[#ecb78c] px-5 py-2 rounded-xl hover:bg-[#c1793f] hover:border-[#dc833b] text-white font-semibold"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitPaper;
