import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

export default function useTodo() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  //fetching todos on mount
  useEffect(() => {
    fetch("http://localhost:8080/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => {
        console.error("Error fetching todos:", error);
        setError(error.message);
      });
  }, []);

  // useMemo to calculate completed and remaining tasks
  //re-calculating only when to-do change
  const completedTasksCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos]
  );

  const remainingTaskCount = useMemo(
    () => todos.length - completedTasksCount,
    [completedTasksCount, todos.length]
  );

  //create a new item with a unique id and send it to backend
  function addTodo(taskTitle) {
    const newTodo = {
      id: uuidv4(),
      title: taskTitle,
      completed: false,
      isEditing: false,
    };

    fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return fetch("http://localhost:8080/todos");
      })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        console.error("Error adding todo:", error);
        setError(error.message);
      });
  }
  //send a delete request to remove the item
  function deleteToDo(id) {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return fetch("http://localhost:8080/todos");
      })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        console.error("Error deleting todo:", error);
        setError(error.message);
      });
  }

  function toggleComplete(id) {
    // Find the todo that is being toggled
    const todoToUpdate = todos.find((todo) => todo.id === id);
    const updatedStatus = !todoToUpdate.completed;

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: updatedStatus } : todo
      )
    );

    // Make a PATCH request to update the completed status in the backend
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: updatedStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: updatedTodo.completed }
              : todo
          )
        );
      })
      .catch((error) => {
        console.error("Error updating todo status:", error);

        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: !updatedStatus } : todo
          )
        );
      });
  }

  function editToDo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  function editTask(taskTitle, id) {
    fetch(`http://localhost:8080/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: taskTitle }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedTodo) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...updatedTodo, isEditing: false } : todo
          )
        );
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        setError(error.message);
      });
  }

  return {
    todos,
    addTodo,
    toggleComplete,
    deleteToDo,
    editToDo,
    editTask,
    completedTasksCount,
    remainingTaskCount,
    error,
  };
}
