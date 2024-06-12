import { PiDotsThreeCircleLight } from "react-icons/pi";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { TbMessage2Cancel } from "react-icons/tb";
import { useEffect, useState } from "react";
import AnswerInput from "./AnswerInput";
import Answer from "./Answer";

const Question = ({ discussion }) => {
  const [boxVisibility, setBoxVisibility] = useState(false);
  const [replyInputClass, setReplyInputClass] = useState("max-h-0 opacity-0");
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const {
    _id,
    content,
    timestamp,
    email,
    answers,
    photoURL,
    upvote,
    downvote,
  } = discussion;

  useEffect(() => {
    setUpCount(upvote);
    setDownCount(downvote);
  }, [upvote, downvote]);

  const handleAnswerClick = () => {
    setBoxVisibility(!boxVisibility);
  };

  const handleViewAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  useEffect(() => {
    if (boxVisibility) {
      setReplyInputClass("max-h-[200px] opacity-100"); // Adjust max-h value according to your needs
    } else {
      setReplyInputClass("max-h-0 opacity-0");
    }
  }, [boxVisibility]);

  const handleUpvoteClick = () => {
    const upvoteData = {
      discussionId: _id,
      email: email,
    };

    fetch("http://localhost:8080/api/discussions/upvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upvoteData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Upvote successful:", data);
        setUpCount((prevCount) => prevCount + 1); // Increase the upvote count
      })
      .catch((error) => {
        console.error("Error occurred while upvoting:", error.message);
      });
  };

  const handleDownvoteClick = () => {
    const downvoteData = {
      discussionId: _id,
      email: email,
    };

    fetch("http://localhost:8080/api/discussions/downvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(downvoteData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Upvote successful:", data);
        setDownCount((prevCount) => prevCount + 1); // Increase the upvote count
      })
      .catch((error) => {
        console.error("Error occurred while downvoting:", error.message);
      });
  };

  return (
    <div>
      <div className="border-t-2 border-[#e6be3c] mb-[2px]"></div>
      <div className="bg-[#f4dec2] w-[70%] px-5 py-3 rounded-2xl mx-5 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-4 items-center">
            <img
              src={
                photoURL ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZBaQWmklNwzgXRyLEDIB9n6lzOEq-fkowNA&s"
              }
              alt=""
              className="rounded-full w-10 h-10"
            />
            <h1 className="text-lg font-medium text-[#7b5229c2]">{email}</h1>
          </div>
          <PiDotsThreeCircleLight className="text-2xl" />
        </div>
        <div className="text-justify">{content}</div>
        <div className="mt-3 flex justify-between items-center">
          <h3 className="text-sm font-light text-gray-600">
            {new Date(timestamp).toLocaleString()}
          </h3>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-[2px]">
              <span className="text-lg font-semibold">{upCount}</span>
              <BiUpvote
                className="text-xl hover:text-white hover:bg-[#f2c35f] hover:rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f2c35f] duration-300"
                onClick={handleUpvoteClick}
              />
            </div>
            <div className="flex items-center gap-[2px]">
              <span className="text-lg font-semibold">{downCount}</span>
              <BiDownvote
                className="text-xl hover:text-white hover:bg-[#f2c35f] hover:rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f2c35f] duration-300"
                onClick={handleDownvoteClick}
              />
            </div>
            {boxVisibility ? (
              <TbMessage2Cancel
                className="text-xl hover:text-white hover:bg-[#f2c35f] hover:rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f2c35f] duration-300"
                onClick={handleAnswerClick}
              />
            ) : (
              <RiQuestionAnswerLine
                className="text-xl hover:text-white hover:bg-[#f2c35f] hover:rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f2c35f] duration-300"
                onClick={handleAnswerClick}
              />
            )}
          </div>
        </div>
      </div>
      <div>{boxVisibility ? <AnswerInput discussionId={_id} /> : ""}</div>
      <div className="relative left-[2%]">
        <h3 className="font-semibold cursor-pointer" onClick={handleViewAnswer}>
          {showAnswer ? "Hide" : "View"} answer(s)
        </h3>
        {showAnswer && (
          <div>
            {answers.map((answer) => (
              <Answer key={answer._id} answer={answer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
