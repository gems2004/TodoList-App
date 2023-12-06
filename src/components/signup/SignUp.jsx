import React, { useEffect, useState } from "react";
import NameForm from "./NameForm";
import PasswordForm from "./PasswordForm";
import { useCreateNewUserMutation } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [counter, setCounter] = useState(1);
  const [createNewUser, data] = useCreateNewUserMutation();
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
  });
  function handleSignUp() {
    try {
      createNewUser({
        email: signUpData.email,
        password: signUpData.password,
        name: {
          firstName: signUpData.firstName,
          middleName: signUpData.middleName,
          lastName: signUpData.lastName,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (counter == 3 && data.isSuccess) {
      setTimeout(() => {
        navigate(`/login`);
      }, 1500);
    }
    if (data?.error?.status == 409) {
      setCounter(1);
    }
  }, [data.isSuccess, counter, data?.error]);
  const errorHandler =
    data?.error?.status == 409 ? (
      <div className="text-center text-danger">
        email/username already in use
      </div>
    ) : undefined;

  return (
    <section className="container d-flex h-screen justify-content-center flex-column">
      <div className="h-75 w-100 container d-flex flex-column gap-4  shadow-lg rounded-5 justify-content-center">
        <div>
          <div className="slider position-relative z-3">
            <div
              className={
                counter == 1
                  ? "quarter-blue"
                  : counter == 2
                  ? "half-blue"
                  : counter == 3
                  ? "full-blue"
                  : undefined
              }
            ></div>
            <div
              className={
                counter == 1
                  ? "blue-ball"
                  : counter == 2
                  ? "ball-end"
                  : counter == 3
                  ? "ball-end"
                  : undefined
              }
            >
              1
            </div>
            <div
              className={
                counter == 1
                  ? "ball"
                  : counter == 2
                  ? "blue-ball"
                  : counter == 3
                  ? "ball-end"
                  : undefined
              }
            >
              2
            </div>
          </div>
        </div>
        <span className="align-self-center fw-bolder fs-1">Sign Up:</span>
        {errorHandler}
        {counter == 1 && (
          <NameForm
            counter={counter}
            setCounter={setCounter}
            signUpData={signUpData}
            setSignUpData={setSignUpData}
            data={data}
          />
        )}
        {counter == 2 && (
          <PasswordForm
            counter={counter}
            setCounter={setCounter}
            signUpData={signUpData}
            setSignUpData={setSignUpData}
            handleSignUp={handleSignUp}
            data={data}
          />
        )}
        {counter == 3 && data.isSuccess == true && (
          <div className="d-flex justify-content-center">
            Redirecting To LogIn
          </div>
        )}
      </div>
    </section>
  );
};

export default SignUp;
