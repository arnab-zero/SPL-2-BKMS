import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthProviderContext";

const AnswerInput = ({ discussionId }) => {
  const { user } = useContext(AuthContext);
  const { email } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.answer.value;

    const answerData = {
      email,
      content,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/api/discussions/answers/${discussionId}`,
        answerData
      );
      console.log("Answer posted successfully:", response.data);
      e.target.reset();
      window.location.reload();
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  return (
    <form
      className="relative left-[5%] mb-5 transition-all duration-500 ease-in-out overflow-hidden items-center flex gap-2"
      onSubmit={handleSubmit}
    >
      <textarea
        name="answer"
        className="p-2 border border-[#d0a364] rounded mt-2 w-[60%] focus"
        placeholder="Write your response"
      ></textarea>
      <input type="submit" value="Submit" className="btn btn-outline" />
    </form>
  );
};

export default AnswerInput;
