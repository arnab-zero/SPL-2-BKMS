import UserContributions from "../components/UserContribution";
import UserInfo from "../components/UserInfo";
import UpdateProfileModal from "../components/UpdateProfileModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";
import ArchivePaper from "../components/ArchivePaper";

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
    <div className="grid grid-cols-5 mx-14 gap-3 mb-10">
      <div className="col-span-3 w-full">
        <UserInfo user={userInfo} onEditProfile={() => setIsModalOpen(true)} />
      </div>
      <aside className="col-span-2 w-full">
        <ArchivePaper
          paperName={"Paper Name 1"}
          paperTopic={"Paper Topic"}
          authors={["Mr. X", "Mr. Y"]}
          submissionDate={"Dec 21, 2002"}
          status={"accepted"}
        />
        <ArchivePaper
          paperName={"Paper Name 2"}
          paperTopic={"Paper Topic"}
          authors={["Mr. X", "Mr. Y"]}
          submissionDate={"Dec 21, 2002"}
          status={"pending"}
        />
        <ArchivePaper
          paperName={"Paper Name 2"}
          paperTopic={"Paper Topic"}
          authors={["Mr. X", "Mr. Y"]}
          submissionDate={"Dec 21, 2002"}
          status={"rejected"}
        />
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
