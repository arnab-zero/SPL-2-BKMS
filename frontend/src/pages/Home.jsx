import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center">
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
  );
};

export default Home;
