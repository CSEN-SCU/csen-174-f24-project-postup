import React from "react";

export default function ProfilePage() {
  return (
    <div className="grid grid-cols-1">
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
          <h2 className="text-xl font-bold mt-4">Welcome, John Doe</h2>
        </div>

      <div className="shadow-xl p-4 rounded-md border border-gray-100">
        <p className="mt-1">
          <strong>Email:</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Student ID #:</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Major:</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Minor:</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Pathway:</strong>{" "}
        </p>
        <div className="mt-6 flex space-x-4">
          <button className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded">
            Edit Program of Study
          </button>
          <button className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded">
            Edit Transfer Credit
          </button>
        </div>
      </div>

      <div className="flex justify-between p-4">
        <button className="bg-gray-700 hover:bg-gray-500 text-white py-1 px-4 rounded">
          FAQ
        </button>
        <button className="bg-gray-700 hover:bg-gray-500 text-white py-1 px-4 rounded">
          About Us
        </button>
      </div>
    </div>
  );
}
