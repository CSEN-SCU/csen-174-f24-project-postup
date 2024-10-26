import React from 'react';

interface CourseProps {
  courseName: string;
  id: string;
  unit: string;
}

const Course: React.FC<CourseProps> = ({ courseName, id, unit }) => {
  return (
    <div className="border p-4 rounded-md shadow-md px-10 mt-2">
      <h2 className="text-lg font-semibold">{courseName}</h2>
      <p>ID: {id}</p>
      <p>Unit: {unit}</p>
    </div>
  );
};

export default Course;
