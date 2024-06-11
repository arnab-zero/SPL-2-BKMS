const AnswerInput = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <div className="relative left-[5%] mb-5 transition-all duration-500 ease-in-out overflow-hidden items-center flex gap-2">
      <textarea
        className=" p-2 border border-[#d0a364] rounded mt-2 w-[60%]"
        placeholder="Write your response"
      ></textarea>
      <h3 className="btn btn-outline" onClick={handleSubmit}>
        Submit
      </h3>
    </div>
  );
};

export default AnswerInput;
