import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordForm = ({ counter, setCounter }) => {
  const navigate = useNavigate();
  if (counter == 3) {
    setTimeout(() => {
      navigate(`/mainpage`);
    }, 2500);
  }
  return (
    <>
      <div className="h-50">
        <div>
          <label htmlFor="fName" className="form-label">
            Password
          </label>
          <input type="text" id="fName" className="form-control" />
        </div>
        <div>
          <label htmlFor="lName" className="form-label">
            Confirm Password
          </label>
          <input type="text" id="lName" className="form-control " />
        </div>
      </div>
      <button
        className="btn btn-primary mt-3"
        onClick={() => {
          setCounter(++counter);
        }}
      >
        SignUp
      </button>
    </>
  );
};

export default PasswordForm;
