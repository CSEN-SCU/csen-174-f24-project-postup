import React, { useState } from "react";
import { CourseCardProps } from "@/app/utils/types";
import { useDraggable } from "@dnd-kit/core";

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  course,
  season,
  year,
  handleRemove,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { ...course, season, year },
  });

  // Individual lock state for this card
  const [isLocked, setIsLocked] = useState(false);

  const style = {
    transform: isLocked
      ? undefined
      : `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    padding: "12px",
    margin: "20px",
    backgroundColor: isLocked ? "#f0f0f0" : "white",
    cursor: isLocked ? "not-allowed" : "grab",
    borderRadius: "6px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
    fontSize: "1.1em",
  };

  // Check if course is valid, otherwise don't render
  if (!course.id) return null;

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex flex-row justify-between">
        <h4
          {...listeners}
          {...attributes}
          style={{
            cursor: isLocked ? "not-allowed" : "grab",
            pointerEvents: isLocked ? "none" : "auto",
          }}
        >
          {course.name}
        </h4>
        <div className="flex gap-2">
          <button
            onClick={() => setIsLocked((prev) => !prev)}
            style={{
              cursor: "pointer",
            }}
            className={`rounded-full w-4 h-4 items-center ${
              isLocked ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isLocked ? "🔒" : "🔓"}
          </button>
          <button
            onClick={() => {
              if (!isLocked) handleRemove(course.id, season, year);
            }}
            style={{
              cursor: isLocked ? "not-allowed" : "pointer",
              pointerEvents: isLocked ? "none" : "auto",
            }}
            className="text-white bg-slate-600 hover:bg-slate-500 active:bg-slate-400 rounded-full w-4 h-4 items-center"
          />
        </div>
      </div>
      <div
        {...listeners}
        {...attributes}
        style={{
          cursor: isLocked ? "not-allowed" : "grab",
          pointerEvents: isLocked ? "none" : "auto",
        }}
      >
        <p>Course ID: {course.id}</p>
        <p>Units: {course.unit}</p>
      </div>
    </div>
  );
};

export default CourseCard;
