import React from "react";
import { Link, useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-screen  d-flex flex-column justify-content-center d-lg-grid align-items-center">
        <div className="h-75 w-100 d-flex flex-column justify-content-center pb-5  align-items-center">
          <img src="/Landing.svg" alt="" />
          <span className="h1">TodoList App</span>
        </div>
        <div className="h-25 container d-flex justify-content-center align-items-center">
          <div className="w-75 d-flex flex-column text-center">
            <button
              className="btn btn-primary w-100"
              onClick={() => {
                navigate(`/login`);
              }}
            >
              Log In
            </button>
            <p className="my-1">
              Didn't Create Account Yet <Link to={`/signup`}>Create One</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
