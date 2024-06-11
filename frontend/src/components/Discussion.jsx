import Answer from "./Answer";
import Question from "./Question";

const Discussion = () => {

  const handlePost = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
  };

  return (
    <div>
      <h1>Discussion</h1>
      <Question />
    </div>
  );
};

export default Discussion;
