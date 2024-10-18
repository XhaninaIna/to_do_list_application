import React from "react";
import ToDoForm from "./ToDoForm";
import ToDo from "./ToDo";
import EditToDoForm from "./EditToDoForm";
import UseToDo from "./UseToDo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
//a container component that displays to-do-task
export default function ToDoWrapper() {
  const {
    todos,
    addTodo,
    toggleComplete,
    deleteToDo,
    editToDo,
    editTask,
    completedTasksCount,
    remainingTaskCount,
    error,
  } = UseToDo();

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <FontAwesomeIcon
        icon={faList}
        style={{ color: "white", fontSize: "30px" }}
      />
      {/* if there is an error in useToDo display it */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ToDoForm addTodo={addTodo} />
      <div className="task-counts">
        <div>
          <strong style={{ color: "white" }}>Completed Tasks:</strong>{" "}
          <span style={{ color: "white" }}>{completedTasksCount}</span>
        </div>
        <div>
          <strong style={{ color: "white" }}>Remaining Tasks:</strong>{" "}
          <span style={{ color: "white" }}>{remainingTaskCount}</span>
        </div>
      </div>
      {todos?.map((todo, index) =>
        todo.isEditing ? (
          <EditToDoForm key={index} editTask={editTask} task={todo} />
        ) : (
          <ToDo
            task={todo}
            key={index}
            toggleComplete={toggleComplete}
            deleteToDo={deleteToDo}
            editToDo={editToDo}
          />
        )
      )}
      {todos.length > 0 && (
        <p style={{ color: "white", fontStyle: "italic" }}>
          You have <strong>{todos.length}</strong> tasks for today
        </p>
      )}
    </div>
  );
}
