import React, { useEffect, useState } from "react";
import {
  useAuthLoginMutation,
  useAuthTokenRefreshQuery,
} from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../features/users/tokenSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [triggerLogin, data] = useAuthLoginMutation();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  function clickHandler() {
    try {
      triggerLogin({
        email: login.email,
        password: login.password,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const firstToken = data?.data?.accessToken;
  const { data: token } = useAuthTokenRefreshQuery(firstToken);

  useEffect(() => {
    if (data.isSuccess) {
      dispatch(getToken(token));
      navigate(`/mainpage`);
    }
  }, [data]);
  const errorHandler =
    data?.error?.status == 404 || data?.error?.status == 401 ? (
      <div className="text-danger text-center">
        Check your email/username or password and try again
      </div>
    ) : undefined;
  console.log(errorHandler);
  console.log(data?.error?.status);
  const formValidator = login.email.length >= 3 && login.password.length >= 8;
  return (
    <section className="container d-flex h-screen justify-content-center flex-column">
      <div className="h-75 w-100 container d-flex flex-column shadow-lg rounded-5 justify-content-center">
        <div className="h1 h-25 align-self-center d-flex align-items-center   ">
          Sign In:
        </div>
        <div className="h-75 d-flex flex-column ">
          {errorHandler}
          <form
            onChange={(e) => {
              setLogin((prevState) => {
                return {
                  ...prevState,
                  [e.target.name]: e.target.value,
                };
              });
            }}
            className="h-75"
          >
            <div>
              <label htmlFor="email" className="form-label">
                Email/Username:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="form-control "
              />
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
            </div>
          </form>
          <div className="h-50">
            <button
              className={`btn btn-primary w-100 `}
              disabled={
                data.status == "pending" || !formValidator ? true : false
              }
              onClick={clickHandler}
            >
              {data.status == "pending" ? "Please Wait" : "LogIn"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
