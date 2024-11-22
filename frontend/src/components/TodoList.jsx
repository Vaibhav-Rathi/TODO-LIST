// TodoList.jsx
import React from "react";

const TodoList = ({ todos, deleteTask, toggleDone, setEditingTodo, editingTodo, editTask }) => {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center space-x-4">
            <div
              onClick={() => toggleDone(todo.id)}
              className={`w-5 h-5 rounded-full border ${todo.done ? "bg-red-500 border-red-500" : "border-gray-400"} cursor-pointer`}
            ></div>
            <div>
              {editingTodo?.id === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editingTodo.title}
                    onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                    className="border p-1 rounded"
                  />
                  <input
                    value={editingTodo.description}
                    onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                    className="border p-1 mt-2 rounded"
                  />
                  <button
                    onClick={() => editTask(todo.id, editingTodo.title, editingTodo.description)}
                    className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTodo(null)}
                    className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className={`font-semibold ${todo.done ? "line-through text-gray-400" : "text-gray-800"}`}>
                    {todo.title}
                  </p>
                  <p className="text-sm text-gray-500">{todo.description}</p>
                </>
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            {!editingTodo && (
              <button
                onClick={() => setEditingTodo(todo)}
                className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => deleteTask(todo.id)}
              className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
