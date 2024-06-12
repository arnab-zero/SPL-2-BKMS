import classNames from "classnames";

const ArchivePaper = ({
  paperName,
  paperTopic,
  authors,
  submissionDate,
  status,
}) => {
  const getBorderColor = () => {
    switch (status) {
      case "rejected":
        return "border-l-8 border-red-500";
      case "approved":
        return "border-l-8 border-green-500";
      case "pending":
        return "border-l-8 border-gray-500";
      default:
        return "border-l-8 border-gray-500";
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col rounded-lg shadow-md overflow-hidden w-full mb-5 ml-5 border-[2px]",
        getBorderColor()
      )}
    >
      <div className="text-black p-4 border-b-2">
        <h3 className="text-black text-xl font-semibold">{paperName}</h3>
        <p className="text-slate-900">Topic: {paperTopic}</p>
      </div>
      <div className="p-4 bg-white flex-grow">
        <p className="text-gray-600 mb-2">Author(s): {authors}</p>
        <p className="text-gray-600 mb-4">Submission Date: {submissionDate}</p>
        <div className="flex justify-end">
          <span
            className={classNames(
              "px-3 py-1 rounded-full text-sm font-semibold capitalize",
              status === "rejected"
                ? "bg-red-500 text-white"
                : status === "approved"
                ? "bg-green-500 text-white"
                : "bg-gray-500 text-white"
            )}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArchivePaper;
