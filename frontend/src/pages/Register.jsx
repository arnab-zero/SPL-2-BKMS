import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left mb-16">
            <h1 className="text-5xl font-bold text-center">Register now!</h1>
            <div className="flex justify-center">
              <p className="text-2xl font-semibold w-[55%] text-center py-6">
                Discover the wonders of Bangla with our Knowledge Graph. Dive
                into a world of exploration and connection.
              </p>
            </div>
          </div>
          <div className="card shrink-0 w-full max-w-xl shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary bg-[#eaba93] hover:bg-[#d8843f] border-none text-white text-base font-semibold">
                  Register
                </button>
              </div>
              <div className="text-center mt-5">
                Already have an accoount?{" "}
                <span className="underline text-[#d8843f] font-bold text-lg">
                  <Link to="/login">Login</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
