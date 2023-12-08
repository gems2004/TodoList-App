import React from "react";

const NameForm = ({ counter, setCounter, signUpData, setSignUpData }) => {
  const formValidator =
    signUpData.firstName.length >= 3 && signUpData.email != "" ? true : false;
  return (
    <>
      <form
        onChange={(e) => {
          setSignUpData((prevState) => {
            return {
              ...prevState,
              [e.target.name]: e.target.value,
            };
          });
        }}
        className="h-50"
      >
        <div>
          <label htmlFor="fName" className="form-label">
            First Name:*
          </label>
          <input
            type="text"
            id="fName"
            name="firstName"
            className="form-control"
            value={signUpData.firstName}
          />
        </div>
        <div>
          <label htmlFor="mName" className="form-label">
            Middle Name:
          </label>
          <input
            type="text"
            id="mName"
            name="middleName"
            className="form-control"
            value={signUpData.middleName}
          />
        </div>
        <div>
          <label htmlFor="lName" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lName"
            name="lastName"
            className="form-control "
            value={signUpData.lastName}
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email/Username:*
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            value={signUpData.email}
          />
        </div>
      </form>
      <button
        disabled={!formValidator}
        className="btn btn-primary mt-3"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setCounter(++counter);
        }}
      >
        Next
      </button>
    </>
  );
};

export default NameForm;
