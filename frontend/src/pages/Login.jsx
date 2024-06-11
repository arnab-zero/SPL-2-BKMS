import { Link, useNavigate } from "react-router-dom";
import { googleSignIn } from "../firebase/GoogleAuth";

import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProviderContext";
// import {
//   EmailPasswordSignIn,
//   EmailPasswordSignUp,
// } from "../firebase/EmailPasswordAuth";

import axios from "axios";

const Login = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    console.log("user: ", user);
  } else console.log("NONE");

  const handleGoogleLogIn = () => {
    googleSignIn()
      .then(async (data) => {
        console.log(data);
        try {
          const response = await axios.post(
            "http://localhost:8000/api/users",
            data
          );
          console.log("Data sent successfully: ", response);
        } catch (e) {
          console.error("Error occurred: ", e);
        }
        setTimeout(() => {
          navigate("/user");
        }, 5000);
      })
      .catch((error) => {
        console.log("Login failed: ", error.message);
      });
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <>
      <div className="bg-[#c1793f]">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col">
            <div className="text-center lg:text-left mb-16">
              <h1 className="text-5xl font-bold text-center">Login now!</h1>
              <p className="py-6 text-xl font-semibold">
                Welcome to the Bangla NLP Knowledge Graph, please log in.
              </p>
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
                  <button
                    type="submit"
                    className="btn btn-primary bg-[#eaba93] hover:bg-[#d8843f] border-none text-white text-base font-semibold"
                    onClick={handleLogIn}
                  >
                    Login
                  </button>
                </div>
                <div className="form-control mt-2">
                  <button
                    className="btn btn-primary bg-gray-300 hover:bg-[#d8843f] border-none"
                    onClick={handleGoogleLogIn}
                  >
                    <FcGoogle className="text-xl" />
                    <span className="text-black font-bold">
                      Sign In With Google
                    </span>
                  </button>
                </div>
                <div className="text-center mt-5">
                  Not registered yet?{" "}
                  <span className="underline text-[#d8843f] font-bold text-lg">
                    <Link to="/register">Create account.</Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
