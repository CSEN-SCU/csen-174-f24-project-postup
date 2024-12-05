import React, { useState } from "react";
import { CourseCardProps } from "@/app/utils/types";
import { useDraggable } from "@dnd-kit/core";
import { getPrettyName } from "@/app/utils/helper";
import ClassDescriptions from "../ClassDescriptions/ClassDescriptions";

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
  console.log(course);

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex flex-row justify-between ">
        <h4
          style={{
            cursor: isLocked ? "not-allowed" : "grab",
            pointerEvents: isLocked ? "none" : "auto",
          }}
          className="text-sm font-bold border-b border-b-black"
        >

          <ClassDescriptions course={course} />
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
          <div className="relative inline-flex group">
            <button
              onClick={() => {
                if (!isLocked) handleRemove(course.id, season, year);
              }}
              style={{
                cursor: isLocked ? "not-allowed" : "pointer",
                pointerEvents: isLocked ? "none" : "auto",
              }}
              className="text-white bg-slate-600 hover:bg-slate-500 active:bg-slate-400 rounded-sm w-5 h-5 flex items-center justify-center"
            >
              <span className="text-xs text-white text-center">🗙</span>
            </button>
            {!isLocked && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 
                bg-white text-red-500 text-xs px-2 py-1 rounded-md 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 
                pointer-events-none 
                whitespace-nowrap">
                Remove
              </div>
            )}
          </div>
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
        <p className="text-sm">{getPrettyName(course.id)}</p>
        <p className="text-sm">{course.unit} Units</p>
      </div>
    </div>
  );
};

export default CourseCard;
