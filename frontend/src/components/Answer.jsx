import { PiDotsThreeCircleLight } from "react-icons/pi";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const Answer = ({ answer }) => {
  const { email, content, _id, timestamp, photoURL } = answer;

  return (
    <div className="bg-[#e8e4de] w-[70%] px-5 py-3 rounded-2xl mx-5 mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-4 items-center">
          <img src={`${photoURL}`} alt="" className="rounded-full w-10 h-10" />
          <h1 className="text-lg font-medium text-[#7b5229c2]">{email}</h1>
        </div>
        <PiDotsThreeCircleLight className="text-2xl" />
      </div>
      <div className="text-justify">{content}</div>
      <div className="mt-3 flex justify-between items-center">
        <h3 className="text-sm font-light text-gray-600">{timestamp}</h3>
        <div className="flex gap-2 items-center">
          <div>
            {/* <BiUpvote className="text-xl hover:text-white hover:bg-[#f2c35f] hover:rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f2c35f] duration-300" /> */}
          </div>
          {/* <BiDownvote className="text-xl hover:text-white hover:bg-[#f2c35f] hover:rounded-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#f2c35f] duration-300" /> */}
        </div>
      </div>
    </div>
  );
};

export default Answer;
