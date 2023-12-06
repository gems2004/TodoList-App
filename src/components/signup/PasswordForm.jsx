import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PasswordForm = ({
  counter,
  setCounter,
  signUpData,
  setSignUpData,
  handleSignUp,
  data,
}) => {
  const navigate = useNavigate();

  const [password, setPassword] = useState();
  const formValidator =
    password == signUpData.password &&
    password != "" &&
    signUpData.password.length >= 8
      ? true
      : false;
  useEffect(() => {
    if (data.isSuccess) {
      setCounter((prevState) => ++prevState);
    }
  }, [data.isSuccess]);
  return (
    <>
      <form className="h-50">
        <div className="mb-2">
          <label htmlFor="fName" className="form-label">
            Password
          </label>
          <input
            type="text"
            id="fName"
            className="form-control"
            value={signUpData.password}
            onChange={(e) => {
              setSignUpData((prevState) => {
                return {
                  ...prevState,
                  password: e.target.value,
                };
              });
            }}
          />
          <div className="form-text">Password Must Be 8 Characters Long</div>
        </div>
        <div>
          <label htmlFor="lName" className="form-label">
            Confirm Password
          </label>
          <input
            type="text"
            id="lName"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="form-control "
          />
        </div>
      </form>
      <button
        disabled={!formValidator}
        type="button"
        className="btn btn-primary mt-3"
        onClick={() => {
          handleSignUp();
        }}
      >
        {data.status == "pending" ? "Please Wait" : "Sign Up"}
      </button>
    </>
  );
};

export default PasswordForm;
