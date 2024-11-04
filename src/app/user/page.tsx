import React from "react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div className="flex space-x-4 text-gray-700">
          <a href="#">Current Academic Year</a>
          <a href="#">Previous Years</a>
          <a href="#">Degree Audit</a>
          <a href="#">Available Courses</a>
          <a href="#">Tools and Useful Links</a>
          <a href="#">Settings</a>
        </div>
        <button className="bg-gray-800 text-white py-1 px-4 rounded">
          My Account (LOGO)
        </button>
      </div>

      <div className="flex">
        <div className="flex flex-col items-center mr-10">
          <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
          <h2 className="text-xl font-bold mt-4">Welcome, John Doe</h2>
        </div>

        <div className="flex-1">
          <p>
            <strong>Email:</strong>{" "}
          </p>
          <p>
            <strong>Student ID #:</strong>{" "}
          </p>
          <p>
            <strong>Major:</strong>{" "}
          </p>
          <p>
            <strong>Minor:</strong>{" "}
          </p>
          <p>
            <strong>Pathway:</strong>{" "}
          </p>

          <div className="mt-6">
            <p>
              <strong>Current Advisor(s):</strong>
            </p>
            <ul className="ml-4 mt-2">
              <li className="flex items-center">
                <span>Advisor A</span>
                <button className="ml-2 bg-gray-800 text-white py-1 px-2 rounded">
                  Contact
                </button>
              </li>
              <li className="flex items-center mt-2">
                <span>Advisor B</span>
                <button className="ml-2 bg-gray-800 text-white py-1 px-2 rounded">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="bg-gray-800 text-white py-2 px-4 rounded">
              Edit Program of Study
            </button>
            <button className="bg-gray-800 text-white py-2 px-4 rounded">
              Edit Transfer Credit
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-10">
        <button className="bg-gray-800 text-white py-1 px-4 rounded">
          FAQ
        </button>
        <button className="bg-gray-800 text-white py-1 px-4 rounded">
          About Us
        </button>
      </div>
    </div>
  );
}
