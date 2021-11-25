import { useState } from "react";
function UserTodo({ todo, completeCallback }) {
  const [completed, setCompleted] = useState(todo.completed);

  const sendTodoComplete = () => {
    setCompleted(true);
    completeCallback(todo.id);
  };

  return (
    <div className="todo-temp-comp">
      <div className="todo-title"> Title: {todo.title}</div>
      <br />
      <div className="todo-complete">
        {" "}
        Completed: {todo.completed ? "True" : "False"}
      </div>
      {completed ? null : (
        <input
          className="complete-btn"
          type="button"
          value="Mark Completed"
          onClick={sendTodoComplete}
        />
      )}
    </div>
  );
}
export default UserTodo;
