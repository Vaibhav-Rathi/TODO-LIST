import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "../components/TodoList";
import TodoInput from "../components/TodoInput";
import TodoSearch from "../components/TodoSearch";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/todo/readAll", {
          withCredentials: true,
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTask = async () => {
    if (task.trim() && description.trim()) {
      try {
        const response = await axios.post(
          "http://localhost:3001/todo/create",
          { title: task, description },
          { withCredentials: true }
        );
        setTodos([...todos, response.data.todo]);
        setTask("");
        setDescription("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todo/delete?id=${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleDone = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/todo/mark-done?id=${id}`,
        {},
        { withCredentials: true }
      );
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, done: response.data.todo.done } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling done:", error);
    }
  };

  const editTask = async (id, updatedTitle, updatedDescription) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/todo/edit?id=${id}`,
        { id, title: updatedTitle, description: updatedDescription },
        { withCredentials: true }
      );
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...response.data.todo } : todo
        )
      );
      setEditingTodo(null);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      <TodoSearch search={search} setSearch={setSearch} />
      <TodoInput
        task={task}
        description={description}
        setTask={setTask}
        setDescription={setDescription}
        addTask={addTask}
      />
      <TodoList
        todos={filteredTodos}
        deleteTask={deleteTask}
        toggleDone={toggleDone}
        setEditingTodo={setEditingTodo}
        editingTodo={editingTodo}
        editTask={editTask}
      />
    </div>
  );
};

export default TodoPage;
