import React from "react";
export function Button({ children, onClick }) {
  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
