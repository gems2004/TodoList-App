import { useWindowSize } from "@uidotdev/usehooks";
import React, { useState } from "react";
import CalenderContainer from "../components/CalenderContainer";
import ProfileIcon from "../assets/ProfileIcon";
import CalendarIcon from "../assets/CalendarIcon";
const MainPage = () => {
  const [calender, setCalender] = useState(false);
  const size = useWindowSize();
  return (
    <>
      <div
        className={` ${
          calender
            ? "d-flex justify-content-center calendar-container "
            : "hider "
        }`}
      >
        <CalenderContainer calender={calender} />
      </div>
      <section
        className={
          calender ? "rounded-top-4 bg-light shadow-lg main-container " : ""
        }
      >
        <div className={`container `}>
          <div className={`d-flex h-screen flex-column`}>
            <div className="align-self-center d-flex w-100 justify-content-between my-5 px-2 ">
              <div>
                <ProfileIcon />
              </div>
              <div
                onClick={() => {
                  setCalender(!calender);
                }}
              >
                <CalendarIcon />
              </div>
            </div>
            <div className="h-100 d-flex flex-column  align-items-center">
              <div className="h1">Today's Tasks:</div>
              <div className="container  w-100 h-100">
                <div>
                  <div className="border border-2 border-opacity-25 rounded-3 d-flex align-items-center flex-column p-3 border-dark h-50 my-3">
                    <div className="d-flex w-100 justify-content-between">
                      <div className="h4">Lorem Ipsum:</div>
                      <div className="">10:00PM</div>
                    </div>
                    <div className="w-100">
                      <button className="btn btn-primary w-100  p-0">
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="align-self-end w-100 h-25 d-flex justify-content-center align-items-end mb-4">
                <button className="add-task bg-primary btn d-flex justify-content-center pb-3 align-items-center text-white">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainPage;
