import { Link } from "react-router-dom";
import TopContributorsList from "../components/TopContributorList";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col">
      <div className="flex-grow grid grid-cols-7 gap-3 mx-5 mb-10">
        <div className="col-span-5">
          <div className="px-24 py-36">
            <div className="flex justify-center">
              <h1
                className={`text-4xl font-bold w-1/2 text-center mb-10 ${
                  user ? "flex flex-col justify-center" : ""
                }`}
              >
                Explore and Experience All The Bangla NLP Research Paper
                Contents
              </h1>
            </div>
            <div className="flex justify-center">
              {!user && (
                <Link to="/register">
                  <h3 className="btn btn-outline bg-blue-500 px-10 text-lg text-white">
                    Get Started
                  </h3>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-2 mt-[70px]">
          <TopContributorsList />
        </div>
      </div>
    </div>
  );
};

export default Home;
