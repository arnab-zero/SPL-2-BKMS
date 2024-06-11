const UserInfo = ({ user, onEditProfile }) => {
  const { username, email, rewardPoints } = user;

  return (
    <div className="bg-white p-6 py-10 rounded-lg shadow-lg text-center">
      <img
        src="https://www.shutterstock.com/image-photo/inter-miamis-lionel-messi-10-260nw-2357832795.jpg"
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">Username: {username}</h2>
      <p className="text-gray-600 mb-2">User Email: {email}</p>
      <p className="text-gray-800 font-semibold">
        Reward Points: {rewardPoints}
      </p>
      <p className="text-gray-600 mb-2">Works at: University of Dhaka</p>
      <p className="text-gray-600 mb-2">From: Dhaka, Bangladesh</p>
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
