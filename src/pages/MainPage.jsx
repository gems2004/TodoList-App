import React, { useEffect, useState } from "react";
import CalenderContainer from "../components/CalenderContainer";
import ProfileIcon from "../assets/ProfileIcon";
import CalendarIcon from "../assets/CalendarIcon";
import {
  useEditTodoMutation,
  useLazyGetAllTodoQuery,
} from "../features/todos/todoSlice";
import {
  useAuthTokenRefreshQuery,
  useLazyGetUserQuery,
} from "../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import AddTodo from "../components/todo/addTodo";
import { getToken, getUserData } from "../features/users/tokenSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import UserTray from "../components/user/UserTray";
import Loader from "../assets/Loader";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [actions, setActions] = useState({
    addTask: false,
    calender: false,
    userInfo: false,
  });
  const state = useSelector((state) => state.token);
  const dateSelector = useSelector((state) => state.date);
  const token = useAuthTokenRefreshQuery();
  const [trigger, { data: todo, isLoading: todoLoading, isFetching }] =
    useLazyGetAllTodoQuery();
  const [triggerUser, { data: userData }] = useLazyGetUserQuery();
  const thisUser = userData?.find((item) => {
    if (item.email === state.userData.UserInfo.email) {
      return item;
    }
  });
  const thisUserTodos =
    todo?.message === "No todos found"
      ? undefined
      : todo?.filter((item) => {
          if (thisUser?.id === item.user) {
            return item;
          }
        });
  const [triggerEditTodo, data] = useEditTodoMutation();
  useEffect(() => {
    if (token.isSuccess) {
      dispatch(getToken(token?.data?.accessToken));
      const decoder = jwtDecode(token?.data?.accessToken);
      dispatch(getUserData(decoder));
      trigger({ date: dateSelector.isoDate });
      triggerUser();
    }
    if (token?.error?.status == 401) {
      navigate("/");
    }
  }, [token, dateSelector.isoDate]);

  const nowDate = new Date();
  const title =
    dateSelector.year !== nowDate.getFullYear() ? (
      <span>{`${dateSelector.year}\\${dateSelector.month}\\${dateSelector.day}`}</span>
    ) : dateSelector.month == nowDate.getMonth() + 1 &&
      dateSelector.day == nowDate.getDate() ? (
      <span>Today's</span>
    ) : dateSelector.year == nowDate.getFullYear() ? (
      <span>{`${dateSelector.month}\\${dateSelector.day}`}</span>
    ) : undefined;
  console.log(thisUserTodos);
  const loader = (
    <div className="d-flex flex-column align-items-center blur-bg justify-content-center position-fixed vh-100 w-100  ">
      <Loader />
      <span className="h2">Loading...</span>
    </div>
  );

  return (
    <>
      {isFetching || todoLoading || data.isLoading ? loader : undefined}
      {actions.addTask && (
        <div className="position-fixed bg-black  bg-opacity-50 container-fluid">
          <AddTodo setActions={setActions} id={thisUser.id} />
        </div>
      )}
      {actions.userInfo && (
        <div className="position-fixed bg-black  bg-opacity-50 container-fluid">
          <UserTray setActions={setActions} user={thisUser} />
        </div>
      )}
      <div
        className={` ${
          actions.calender
            ? "d-flex justify-content-center calendar-container "
            : "hider "
        }`}
      >
        <CalenderContainer calender={actions.calender} />
      </div>
      <section
        className={
          actions.calender
            ? "rounded-top-4 bg-white main-container"
            : "h-100 pb-5 "
        }
      >
        <div className={`container h-100 pb-5  `}>
          <div className={`d-flex flex-column h-100 `}>
            <div className="align-self-center d-flex w-100 justify-content-between my-5 px-2 ">
              <div
                onClick={() => {
                  setActions((prevState) => {
                    return {
                      ...prevState,
                      userInfo: true,
                    };
                  });
                }}
              >
                <ProfileIcon />
              </div>
              <div
                onClick={() => {
                  setActions((prevState) => {
                    return {
                      ...prevState,
                      calender: !actions.calender,
                    };
                  });
                }}
              >
                <CalendarIcon />
              </div>
            </div>
            <div className="h-100 d-flex flex-column align-items-center">
              <div className="h1">{title} Tasks:</div>
              <div className="container w-100">
                {thisUserTodos?.map((item) => {
                  if (!item.completed) {
                    return (
                      <div
                        key={item._id}
                        className="container pointer-event border border-black  d-flex justify-content-between  my-3 rounded-4"
                        onClick={() => {
                          triggerEditTodo({
                            id: item._id,
                            user: item.user,
                            title: item.title,
                            text: item.text,
                            completed: !item.completed,
                            deadline: item.deadline,
                          });
                        }}
                      >
                        <div className="m-2 py-2 d-flex align-items-center justify-content-between w-100 gap-2 ">
                          <div className="d-flex align-items-center gap-2  ">
                            <div
                              style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                border: `1px solid black`,
                                backgroundColor: item.completed ? "black" : "",
                              }}
                              className="rounded-5 "
                            ></div>
                            <div className="d-flex flex-column ">
                              <span className="h2 m-0 ">{item.title}</span>
                              <span className="h5 m-0 ">{item.text}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
                {thisUserTodos == 0 ? (
                  <div className="d-flex flex-column  align-items-center justify-content-center w-100 my-5 pt-5  h-100">
                    <img src="/empty.jpg" width={350} alt="" />
                    <span className="h2">You don't have any todos</span>
                  </div>
                ) : undefined}
              </div>
              <BottomNav
                className={`position-fixed  bottom-0 w-100 shadow-lg rounded-top-5 ${
                  actions.addTask == true ||
                  actions.moreInfoTray == true ||
                  actions.userInfo == true
                    ? "visually-hidden"
                    : ""
                }`}
                setActions={setActions}
                home={true}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MainPage;
