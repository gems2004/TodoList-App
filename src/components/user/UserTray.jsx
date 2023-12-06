import React, { useEffect, useState } from "react";
import X from "../../assets/X";
import {
  useAuthLogOutMutation,
  useUpdateUserDataMutation,
} from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

function UserTray({ setActions, user }) {
  const navigate = useNavigate();
  const [triggerUpdateUserData, data] = useUpdateUserDataMutation();
  const [triggerLogOut, logout] = useAuthLogOutMutation();
  console.log(data);
  const [userData, setUserData] = useState({
    fname: user.name.firstName,
    mname: user.name.middleName,
    lname: user.name.lastName,
    email: user.email,
  });
  useEffect(() => {
    if (logout.isSuccess === true) {
      navigate(`/`);
    }
    if (data.isSuccess === true) {
      setActions((prevState) => {
        return {
          ...prevState,
          userInfo: false,
        };
      });
    }
  }, [logout.isSuccess, data.isSuccess]);
  return (
    <div className="vh-100 container d-flex align-items-center ">
      <div className="h-75 w-100  bg-white rounded-3 d-flex flex-column align-items-center ">
        <div className="d-flex align-items-center w-100  ">
          <h1 className="m-2 flex-grow-1 ">User Info:</h1>
          <div
            className="cursor-pointer"
            onClick={() => {
              setActions((prevState) => {
                return {
                  ...prevState,
                  userInfo: false,
                };
              });
            }}
          >
            <X />
          </div>
        </div>
        <form
          onClick={(e) => e.preventDefault()}
          className="container d-flex flex-column h-100 my-2 gap-1 justify-content-between "
          onChange={(e) => {
            setUserData((prevState) => {
              return {
                ...prevState,
                [e.target.name]: e.target.value,
              };
            });
          }}
        >
          <div>
            <label htmlFor="fname" className="fs-3">
              First Name:
            </label>
            <input
              type="text"
              name="fname"
              className="form-control "
              id="fname"
              value={userData.fname}
            />
            <label htmlFor="mname" className="fs-3">
              Middle Name:
            </label>
            <input
              type="text"
              name="mname"
              className="form-control "
              id="mname"
              value={userData.mname}
            />
            <label htmlFor="lname" className="fs-3">
              Last Name:
            </label>
            <input
              type="text"
              name="lname"
              className="form-control "
              id="lname"
              value={userData.lname}
            />
            <label htmlFor="email" className="fs-3">
              Email/Username:
            </label>
            <input
              type="text"
              name="email"
              className="form-control "
              id="email"
              value={userData.email}
            />
          </div>
          <div className="d-flex flex-column gap-2 ">
            <button
              className="btn btn-primary"
              onClick={() => {
                triggerUpdateUserData({
                  id: user.id,
                  email: userData.email,
                  name: {
                    firstName: userData.fname,
                    middleName: userData.mname,
                    lastName: userData.lname,
                  },
                });
              }}
            >
              Submit Changes
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                triggerLogOut();
              }}
            >
              Log Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserTray;
