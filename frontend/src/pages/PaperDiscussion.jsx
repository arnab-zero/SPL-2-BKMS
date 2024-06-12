import { useLocation } from "react-router-dom";
import Discussion from "../components/Discussion";

const PaperDiscussion = () => {
  const location = useLocation();
  const { paper } = location.state || { name: "arnab" };
  // console.log("Paper name: ", paper?.properties);
  return (
    <div className="mx-[5%]">
      <div className="mt-4 mb-10">
        <h1 className="text-2xl font-bold">
          Paper:{" "}
          <span className="text-2xl font-bold underline">
            {paper?.properties.title}
          </span>
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
      <Discussion />
    </div>
  );
};

export default PaperDiscussion;
