import React from "react";

const TodoSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="ml-10 text-3xl font-bold text-gray-800">To-Do List</h1>
      <div className="flex items-center space-x-2 border rounded-full border-slate-400 px-3 py-2">
        <button className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 text-[#ff5845]"
            viewBox="0 0 50 45"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125
               L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 
               3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 
               11.703125 12.703125 5 21 5 Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="focus:outline-none text-center"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </button>
      </div>
    </div>
  );
};

export default TodoSearch;
