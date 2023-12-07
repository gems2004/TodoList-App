import React, { useEffect } from "react";
import BottomNav from "../components/BottomNav";
import {
  useEditTodoMutation,
  useLazyGetAllCompletedTodoTodayQuery,
  useLazyGetAllTodoQuery,
} from "../features/todos/todoSlice";
import {
  useAuthTokenRefreshQuery,
  useLazyGetUserQuery,
} from "../features/users/usersSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getToken, getUserData } from "../features/users/tokenSlice";
import { jwtDecode } from "jwt-decode";
import Loader from "../assets/Loader";

function CompletedTodos() {
  const dispatch = useDispatch();
  const date = new Date().toISOString().substring(0, 10);
  const [trigger, { data: todo, isFetching }] =
    useLazyGetAllCompletedTodoTodayQuery();
  const [triggerUser, { data: userData }] = useLazyGetUserQuery();
  const [triggerEditTodo, data] = useEditTodoMutation();
  const state = useSelector((state) => state.token);
  const token = useAuthTokenRefreshQuery();
  const thisUser = userData?.find((item) => {
    if (item.email === state.userData.UserInfo.email) {
      return item;
    }
  });
  const thisUserTodos = todo?.filter((item) => {
    if (thisUser?.id === item.user) {
      return item;
    }
  });

  useEffect(() => {
    if (token.isSuccess) {
      dispatch(getToken(token?.data?.accessToken));
      const decoder = jwtDecode(token?.data?.accessToken);
      dispatch(getUserData(decoder));
      trigger(date);
      triggerUser();
    }
    if (token?.error?.status == 401) {
      navigate("/");
    }
  }, [token, todo]);
  console.log(thisUserTodos);
  const loader = (
    <div className="d-flex flex-column align-items-center blur-bg justify-content-center position-fixed vh-100 w-100  ">
      <Loader />
      <span className="h2">Loading...</span>
    </div>
  );
  return (
    <div className="mb-5 pt-3">
      {isFetching || data.isLoading ? loader : undefined}
      <div className="d-flex  flex-column align-items-center container pb-5 ">
        <h1>Completed Todos:</h1>
        <div className="container w-100">
          {thisUserTodos?.map((item) => {
            if (item.completed) {
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
                  <div className="m-2 py-2 d-flex align-items-center gap-2 ">
                    <div
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        border: `1px solid black`,
                        backgroundColor: item.completed ? "black" : "",
                      }}
                      className="rounded-5 "
                    ></div>
                    <div className="d-flex flex-column">
                      <del className="h3 m-0 ">{item.title}</del>
                      <del className="h5 m-0 ">{item.text}</del>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <BottomNav
        className={`position-fixed  bottom-0 w-100 bg-white shadow-lg  rounded-top-5 `}
      />
    </div>
  );
}

export default CompletedTodos;
