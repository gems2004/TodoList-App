import React from "react";

const NameForm = ({ counter, setCounter }) => {
  return (
    <>
      <div className="h-50">
        <div>
          <label htmlFor="fName" className="form-label">
            First Name:
          </label>
          <input type="text" id="fName" className="form-control" />
        </div>
        <div>
          <label htmlFor="lName" className="form-label">
            Last Name:
          </label>
          <input type="text" id="lName" className="form-control " />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input type="text" id="email" className="form-control" />
        </div>
      </div>
      <button
        className="btn btn-primary mt-3"
        onClick={() => {
          setCounter(++counter);
        }}
      >
        Next
      </button>
    </>
  );
};

export default NameForm;
