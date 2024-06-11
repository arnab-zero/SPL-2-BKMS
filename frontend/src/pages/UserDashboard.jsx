import UserContributions from "../components/UserContribution";
import UserInfo from "../components/UserInfo";
import UpdateProfileModal from "../components/UpdateProfileModal";
import { useState } from "react";

const user = {
  username: "John Doe",
  email: "john.doe@example.com",
  profilePhoto: "https://via.placeholder.com/150",
  rewardPoints: 1200,
  contributions: [
    {
      id: 1,
      title: "Research on AI",
      timestamp: "2023-05-15",
      status: "Accepted",
    },
    {
      id: 2,
      title: "Study on Quantum Computing",
      timestamp: "2023-04-10",
      status: "Declined",
    },
    // Add more contributions as needed
  ],
};

const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(user);

  const handleUpdateProfile = (updatedUser) => {
    setUserInfo(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* <div className="flex p-4 space-x-4"> */}
      <div className="w-full">
        <UserInfo user={userInfo} onEditProfile={() => setIsModalOpen(true)} />
      </div>
      <aside className="w-full">
        <UserContributions contributions={user.contributions} />
      </aside>
      {/* </div> */}
      {isModalOpen && (
        <UpdateProfileModal
          user={userInfo}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default UserDashboard;
