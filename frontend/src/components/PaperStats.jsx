import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";

const PaperStats = () => {
  const user = useContext(AuthContext);
  const { paperSubmitted, paperApproved } = user.user;
  // console.log("check: ", paperSubmitted, paperRejected);
  return (
    <div className="grid grid-cols-2 gap-4 mt-5">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Total Submitted Papers
        </h2>
        <p className="text-3xl font-bold text-blue-500 mt-2">
          {paperSubmitted}
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-700">Approved Papers</h2>
        <p className="text-3xl font-bold text-green-500 mt-2">
          {paperApproved}
        </p>
      </div>
    </div>
  );
};

export default PaperStats;
