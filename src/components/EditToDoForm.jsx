// edit an existing to-do task
import React, { useState, useEffect } from "react";

export default function EditToDoForm({ editTask, task }) {
  // holds  the current value of the task's title as it is being edited
  const [values, setValues] = useState(task.title);
  // Update state when task changes
  useEffect(() => {
    setValues(task.title);
  }, [task]);

  function handleSubmit(e) {
    e.preventDefault();
    editTask(values, task.id);
    setValues("");
  }

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Update task"
        value={values}
        onChange={(e) => setValues(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Update task
      </button>
    </form>
  );
}
