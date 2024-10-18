import React, { useState } from "react";
//add a new task to to-do-list
//renders the form when user input a task descript and submitted to add a new task
export default function ToDoForm({ addTodo }) {
  const [values, setValues] = useState("");
   
  // prevent default form submission
  function handleSubmit(e) {
    e.preventDefault();

    if (values.trim() === "") {
      console.error("Task cannot be empty!");
      return;
    }

    addTodo(values.trim());
    setValues("");
  }

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="What is the task today?"
        value={values}
        onChange={(e) => setValues(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
}
