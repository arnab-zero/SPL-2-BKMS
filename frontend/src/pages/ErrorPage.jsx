import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-[#e6b34c]">Oops!</h1>
        <p className="text-lg mb-6">This page is not available.</p>
        <Link
          to="/"
          className="inline-block cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-300"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
