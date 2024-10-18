import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenSquare } from "@fortawesome/free-solid-svg-icons";
// renders an individual to-do-task and provides functionality(complete, edit,delete)
export default function ToDo({ task, toggleComplete, deleteToDo, editToDo }) {
  console.log(task);
  return (
    <div className="Todo">
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <span className={`${task.completed ? "completed" : ""}`}>
          {task.title}
        </span>
      </label>
      <div>
        <FontAwesomeIcon icon={faPenSquare} onClick={() => editToDo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteToDo(task.id)} />
      </div>
    </div>
  );
}
