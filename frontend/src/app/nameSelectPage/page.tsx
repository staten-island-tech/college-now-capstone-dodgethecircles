import React from "react";

export default function NameSelect() {
  return (
    <div className="flex items-center justify-center h-95vh bg-gray-900 font-press-start">
      <div className="flex flex-col items-center mb-40">
        <h1 className="text-white mb-20">Enter A Name</h1>
        <form className="flex flex-col items-center">
          <input
            type="text"
            className="px-4 py-2 text-base mb-20 bg-white border-none rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 text-base bg-blue-500 text-white border-none rounded-md cursor-pointer transition duration-300 ease-in-out transform hover:translate-y-2 shadow-md hover:shadow-lg active:translate-y-2 active:shadow-none"
          >
            Set
          </button>
        </form>
      </div>
    </div>
  );
}
