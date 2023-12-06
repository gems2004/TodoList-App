import React from "react";
import { useNavigate } from "react-router-dom";

function BottomNav({ setActions, className, home }) {
  const navigate = useNavigate();
  return (
    <div className={className}>
      <div className="d-flex justify-content-between mx-4 align-items-end  py-2">
        <button
          class="btn"
          onClick={() => {
            navigate("/mainpage/completed");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="46"
            height="46"
            fill="currentColor"
            class="bi bi-check2"
            viewBox="0 0 16 16"
          >
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
          </svg>
        </button>

        <button
          onClick={() => {
            setActions((prevState) => {
              return {
                ...prevState,
                addTask: true,
              };
            });
          }}
          className="add-task bg-primary btn d-flex justify-content-center pb-3 align-items-center text-white"
        >
          +
        </button>
        <button
          className="btn"
          onClick={() => {
            navigate(`/mainpage`);
          }}
        >
          {home == true ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              fill="currentColor"
              class="bi bi-house-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              fill="currentColor"
              class="bi bi-house"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default BottomNav;
