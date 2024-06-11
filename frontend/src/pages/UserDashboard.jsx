import UserContributions from "../components/UserContribution";
import UserInfo from "../components/UserInfo";
import UpdateProfileModal from "../components/UpdateProfileModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(user);
    // console.log("User info from User Dashboard: ", userInfo);
  }, [user]);

  // const { email, displayName, photoURL } = userInfo;

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
        {/* <UserContributions contributions={user?.contributions} /> */}
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
