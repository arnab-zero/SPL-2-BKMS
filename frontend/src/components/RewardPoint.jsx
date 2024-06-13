import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";

const RewardPoint = () => {
  const user = useContext(AuthContext);
  const { rewardPoints } = user.user;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center mt-5">
      <h2 className="text-xl font-semibold text-gray-700">Reward Points</h2>
      <p className="text-3xl font-bold text-yellow-500 mt-2">{rewardPoints}</p>
    </div>
  );
};

export default RewardPoint;
