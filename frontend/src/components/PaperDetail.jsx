import { useNavigate } from "react-router-dom";

const PaperDetail = ({ nodeDetails }) => {
  // console.log("From paper detail: ", nodeDetails?.paper.properties.title);
  const paper = nodeDetails?.paper;
  const navigate = useNavigate();
  console.log("Elementid: ", paper?.properties.arxivId);

  const handleNavigate = () => {
    navigate(`/discussion/${paper?.properties.arxivId}`, { state: { paper } });
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold underline">
          {paper?.properties.title}
        </h1>
        <h3 className="text-black font-semibold text-base py-2">
          Author(s):{" "}
          <span className="text-gray-700">{paper?.properties.authors}</span>
        </h3>
        <p className="text-gray-600">
          Published on: {paper?.properties.publicationDate}
        </p>
        <p>
          Open with{" "}
          <span className="text-blue-400 underline">
            <a href={`http://${paper?.properties.link}`}>
              {paper?.properties.link}
            </a>
          </span>
        </p>
        <h3 className="text-lg font-semibold mt-3">Summary:</h3>
        <p className="text-justify w-[80%]">{paper?.properties.abstract}</p>
      </div>
      <div className="my-2">
        <button
          className="text-lg font-semibold text-[#d49e47] underline"
          onClick={handleNavigate}
        >
          View discussion on this paper
        </button>
      </div>
    </div>
  );
};

export default PaperDetail;
