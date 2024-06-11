const UserInfo = ({ user, onEditProfile }) => {
  const displayName = user?.displayName;
  const email = user?.email;
  const photoURL = user?.photoURL;
  const rewardPoints = user?.rewardPoints;
  const workplace = user?.workplace;
  const location = user?.location;

  return (
    <div className="bg-white p-6 py-10 rounded-lg shadow-lg text-center">
      <img
        src={`${photoURL}`}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">Username: {displayName}</h2>
      <p className="text-gray-600 mb-2">User Email: {email}</p>
      <p className="text-gray-800 font-semibold">
        Reward Points: {rewardPoints || 0}
      </p>
      {workplace && <p className="text-gray-600 mb-2">Works at: {workplace}</p>}
      {location && <p className="text-gray-600 mb-2">From: {location}</p>}
      <button
        onClick={onEditProfile}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Update Profile
      </button>
    </div>
  );
};

export default UserInfo;
