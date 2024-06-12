import UserContribution from "../components/UserContribution";
import UserInfo from "../components/UserInfo";
import UpdateProfileModal from "../components/UpdateProfileModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";
import ArchivePaper from "../components/ArchivePaper";
import PaperStats from "../components/PaperStats";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const handleUpdateProfile = (updatedUser) => {
    setUserInfo(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-5 mx-14 gap-3 mb-10">
      <div className="col-span-3 w-full mb-5">
        <UserInfo onEditProfile={() => setIsModalOpen(true)} />
        <PaperStats />
      </div>
      <aside className="col-span-2 w-full">
        <UserContribution />
      </aside>
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
