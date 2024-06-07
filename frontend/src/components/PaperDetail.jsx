const PaperDetail = ({ nodeDetails }) => {
  console.log("From paper detail: ", nodeDetails?.paper.properties.title);
  const paper = nodeDetails?.paper;

  return (
    <div>
      <h1 className="text-2xl font-bold underline">
        {paper?.properties.title}
      </h1>
      <h3 className="text-black font-semibold text-base py-2">
        {paper?.properties.authors}
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
      <p className="text-justify">{paper?.properties.abstract}</p>
      <h1></h1>
    </div>
  );
};

export default PaperDetail;
