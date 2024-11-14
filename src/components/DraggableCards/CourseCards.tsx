import React from "react";
import { CourseCardProps } from "@/app/utils/types";
import { useDraggable } from "@dnd-kit/core";

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  course,
  season,
  year,
  handleRemove
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { ...course, season, year },
  });

  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    padding: "12px",
    margin: "20px",
    backgroundColor: "white",
    cursor: "grab",
    borderRadius: "6px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
    fontSize: "1.1em",
  };

  // Check if course is valid, otherwise don't render
  if (!course.id) return null;

  return (
    <div ref={setNodeRef} style={ style }>
      <div className="flex flex-row justify-between" >
        <h4 {...listeners} {...attributes} style={{ cursor: 'grab' }} >{course.name}</h4>
        <button onClick={() => { handleRemove(course.id, season, year) }} style={{ cursor: 'pointer', pointerEvents: "auto" }} className="text-white bg-slate-600 hover:bg-slate-500 active:bg-slate-400 rounded-full w-4 h-4 items-center"></button>
      </div>
      <div {...listeners} {...attributes} style={{ cursor: 'grab' }}>
        <p>Course ID: {course.id}</p>
        <p>Units: {course.unit}</p>
      </div>
    </div>
  );
};

export default CourseCard;
