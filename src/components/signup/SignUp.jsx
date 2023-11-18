import React, { useState } from "react";
import NameForm from "./NameForm";
import PasswordForm from "./PasswordForm";

const SignUp = () => {
  const [counter, setCounter] = useState(1);
  console.log(counter);
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

        {counter == 1 && <NameForm counter={counter} setCounter={setCounter} />}
        {(counter == 2 || counter == 3) && (
          <PasswordForm counter={counter} setCounter={setCounter} />
        )}
      </div>
    </section>
  );
};

export default SignUp;
