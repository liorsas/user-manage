import { useState } from "react";
function AddTodo({ userId, callbackCancelTodo, callbackAddTodo }) {
  const [title, setTitle] = useState("");

  const passNewTodo = () => {
    if (title !== "") {
      callbackAddTodo(title);
    }
  };

  return (
    <div className="add-todo-box">
      <h3>New Todo - User{userId}</h3>

      <div className="add-box">
        <label>
          {" "}
          Title
          <input
            className="add-inp"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
        </label>
        <br /> <br />
        <div className="btn-add-gen">
          <input
            className="add-btn"
            type="button"
            value="Cancel"
            onClick={callbackCancelTodo}
          />
          <input
            className="add-btn"
            type="button"
            value="Add"
            onClick={passNewTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
