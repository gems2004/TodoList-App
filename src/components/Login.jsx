import React from "react";

const Login = () => {
  return (
    <section className="container d-flex h-screen justify-content-center flex-column">
      <div className="h-75 w-100 container d-flex flex-column shadow-lg rounded-5 justify-content-center">
        <div className="h1 h-25 align-self-center d-flex align-items-center   ">
          Sign In:
        </div>
        <div className="h-75 d-flex flex-column ">
          <div className="h-75">
            <div>
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input type="text" id="email" className="form-control " />
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                name=""
                id="password"
                className="form-control"
              />
              <div className="form-text">
                Password Must Be 8 Characters Long
              </div>
            </div>
          </div>
          <div className="h-50">
            <button className="btn btn-primary w-100">Log In</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
