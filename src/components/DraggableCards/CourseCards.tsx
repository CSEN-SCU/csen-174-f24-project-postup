import React from "react";
import { CourseCardProps } from "@/app/utils/types";
import { useDraggable } from "@dnd-kit/core";

const CourseCard: React.FC<CourseCardProps> = ({ id, course, season, year }) => {

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
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h4>{course.name}</h4>
      <p>Course ID: {course.id}</p>
      <p>Units: {course.unit}</p>
    </div>
  );
}

export default CourseCard
