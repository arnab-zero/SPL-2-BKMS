import { Link } from "react-router-dom";
import TopContributorsList from "../components/TopContributorList";

const Home = () => {
  return (
    <div className="grid grid-cols-7 gap-3 mx-5 mb-10">
      <div className="col-span-5">
        <div className="px-24 py-36">
          <div className="flex justify-center">
            <h1 className="text-4xl font-bold w-1/2 text-center mb-10">
              Explore and Experience All The Bangla NLP Research Paper Contents.
            </h1>
          </div>
          <div className="flex justify-center">
            <Link to="/register">
              <h3 className="btn btn-outline px-10 text-lg bg-[#DaB495] text-white">
                Get Started
              </h3>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <TopContributorsList />
      </div>
    </div>
  );
};

export default Home;
