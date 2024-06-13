import { useEffect } from "react";
import PropTypes from "prop-types";

const PaperInfoModal = ({ isOpen, onClose, nodeDetails }) => {
  const paperInfo = nodeDetails?.paper?.properties || {};
  const { title, authors, publicationDate, link, abstract } = paperInfo;

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Close modal on overlay click
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={handleOverlayClick}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-30"></div>
        <div className="modal-dialog bg-white rounded-lg max-w-3xl w-full p-6 text-left relative">
          <div className="modal-header flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold leading-6 text-gray-900">
              <span className="underline">{title}</span>
            </h3>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.933 2.435a1 1 0 01-1.414-1.447L8.586 10 5.653 7.066a1 1 0 111.414-1.414L10 8.586l2.933-2.434a1 1 0 011.414 1.447L11.414 10l2.934 2.933a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="modal-body">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Author(s): <span className="font-normal">{authors}</span>
            </h4>
            <p className="text-gray-600 mb-2">
              Published on: {publicationDate}
            </p>
            <p className="mb-2">
              Open with{" "}
              <a
                href={`http://${link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {link}
              </a>
            </p>
            <h4 className="text-lg font-semibold mt-4 mb-2">Summary:</h4>
            <p className="text-gray-800">{abstract}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

PaperInfoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  nodeDetails: PropTypes.shape({
    paper: PropTypes.shape({
      properties: PropTypes.shape({
        title: PropTypes.string,
        authors: PropTypes.string,
        publicationDate: PropTypes.string,
        link: PropTypes.string,
        abstract: PropTypes.string,
      }),
    }),
  }),
};

export default PaperInfoModal;
