import React from "react";

const TodoInput = ({ task, description, setTask, setDescription, addTask }) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-full">
      <input
        type="text"
        className="ml-4 flex-1 bg-gray-100 focus:outline-none"
        placeholder="Add your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        className="ml-4 flex-1 bg-gray-100 focus:outline-none"
        placeholder="Add your Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={addTask}
        className="bg-red-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-red-600"
      >
        ADD
      </button>
    </div>
  );
};

export default TodoInput;
