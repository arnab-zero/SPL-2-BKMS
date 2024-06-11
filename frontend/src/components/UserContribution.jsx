const UserContributions = ({ contributions }) => {
  //   const contributions = [
  //     { id: 1, status: "Accepted", title: "Paper Title", timestamp: "Timestamp" },
  //   ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">User Contributions</h3>
      <ul>
        {contributions.map((contribution) => (
          <li
            key={contribution.id}
            className={`mb-4 p-4 rounded-lg ${
              contribution.status === "Accepted"
                ? "border-l-4 border-green-500"
                : "border-l-4 border-red-500"
            }`}
          >
            <h4 className="text-lg font-semibold">{contribution.title}</h4>
            <p className="text-gray-600">
              Submitted on: {contribution.timestamp}
            </p>
            <p
              className={`font-semibold ${
                contribution.status === "Accepted"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              Status: {contribution.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserContributions;
