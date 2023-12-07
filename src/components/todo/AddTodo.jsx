import React, { useEffect, useState } from "react";
import X from "../../assets/X";
import { useAddNewTodoMutation } from "../../features/todos/todoSlice";

function AddTodo({ setActions, id }) {
  const date = new Date();
  const dateTime = date.toISOString().substring(0, 10);
  const [addTodoBody, setAddTodoBody] = useState({
    title: "",
    description: "",
    dueDate: dateTime,
  });
  const [triggerAddTodo, data] = useAddNewTodoMutation();
  function clickHandler() {
    try {
      triggerAddTodo({
        user: id,
        title: addTodoBody.title,
        text: addTodoBody.description,
        deadline: addTodoBody.dueDate,
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (data.isSuccess) {
      setActions((prevState) => {
        return {
          ...prevState,
          addTask: false,
        };
      });
    }
  }, [data.isSuccess]);

  const formValidator =
    addTodoBody.title.length >= 3 && addTodoBody.description.length <= 30;
  return (
    <div className="h-screen  container d-flex align-items-center">
      <div className="h-50  w-100 bg-white rounded-3 d-flex flex-column align-items-center ">
        <div className="d-flex align-items-center w-100  ">
          <h1 className="m-2 flex-grow-1 ">Add New Task:</h1>
          <div
            className="cursor-pointer "
            onClick={() => {
              setActions((prevState) => {
                return {
                  ...prevState,
                  addTask: false,
                };
              });
            }}
          >
            <X />
          </div>
        </div>
        <form
          onClick={(e) => e.preventDefault()}
          className="container d-flex flex-column h-100 my-2"
          onChange={(e) => {
            setAddTodoBody((prevState) => {
              return {
                ...prevState,
                [e.target.name]: e.target.value,
              };
            });
          }}
        >
          <label htmlFor="title" className="fs-3 ">
            Title:
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            required={true}
            value={addTodoBody.title}
          />
          <label htmlFor="description" className="fs-3 ">
            Description:
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            id="description"
            value={addTodoBody.description}
          />
          <label htmlFor="dueDate" className="fs-3 ">
            Due Date:
          </label>
          <input
            type="date"
            name="dueDate"
            className="form-control"
            id="dueDate"
            min={dateTime}
            required={true}
            max={`2024-11-24`}
            value={addTodoBody.dueDate}
          />
          <button
            className="btn btn-primary  my-4"
            disabled={!formValidator || data.isLoading}
            onClick={clickHandler}
          >
            {data.isLoading ? "Loading..." : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTodo;
