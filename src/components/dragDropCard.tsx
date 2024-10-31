// components/DragDropCard.tsx
import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import autoAnimate from "@formkit/auto-animate";
import { userCourses } from "./UserData/userCourses";
import { AddClassProp } from "@/app/utils/interfaces";
import AddClass from "./UserData/AddClass";

// Initial course data
const initialCourses = userCourses;

// Type definitions for course structure
type Course = { name: string; id: string; unit: string };
type Quarter = { season: string; year: string; courses: Course[] };

// Main Drag and Drop Component
export default function DragDropCourses() {
  const [quarters, setQuarters] = useState<Quarter[]>(initialCourses);
  const [isAddingClass, setAddingClass]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [selectedQuarter, setSelectedQuarter]: [
    [string, string],
    Dispatch<SetStateAction<[string, string]>>
  ] = useState(["", ""]);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active.data.current) return;

    const { season: draggedSeason, year: draggedYear } = active.data.current as { season: string; year: string };
    const [targetSeason, targetYear] = (over.id as string).split("-");

    if (draggedSeason !== targetSeason || draggedYear !== targetYear) {
      const updatedQuarters = quarters.map((quarter) => {
        if (quarter.season === draggedSeason && quarter.year === draggedYear) {
          return {
            ...quarter,
            courses: quarter.courses
              .filter((course): course is Course => course !== undefined)
              .filter((course) => course.id !== active.data.current?.id),
          };
        }
        if (quarter.season === targetSeason && quarter.year === targetYear) {
          return {
            ...quarter,
            courses: [
              ...quarter.courses.filter((course): course is Course => course !== undefined),
              active.data.current as Course,
            ],
          };
        }
        return quarter;
      }) as Quarter[];

      setQuarters(updatedQuarters);
    }
  };

  const renderCourseCards = (season: string, year: string) => {
    const quarterCourses = quarters.find((q) => q.season === season && q.year === year)?.courses || [];

    return quarterCourses.map((course) => (
      <CourseCard
        key={`${season}-${year}-${course.id}`}
        id={`${season}-${year}-${course.id}`}
        course={course}
        season={season}
        year={year}
      />
    ));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4">
        {/* Render Droppable Quarters */}
        <div className="grid grid-cols-3 gap-4">
          {quarters.map(({ season, year }) => (
            <DroppableQuarter key={`${season}-${year}`} id={`${season}-${year}`} season={season} year={year}>
              {renderCourseCards(season, year)}
              <AddClass setAddingClass={setAddingClass} setSelectedQuarter={setSelectedQuarter} season={season} year={year}/>
            </DroppableQuarter>
          ))}
        </div>
      </div>
    </DndContext>
  );
}

// CourseCard Component
type CourseCardProps = {
  id: string;
  course: Course;
  season: string;
  year: string;
};

function CourseCard({ id, course, season, year }: CourseCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { ...course, season, year },
  });

  const style = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    padding: "12px",
    margin: "20px",
    backgroundColor: "lightblue",
    cursor: "grab",
    borderRadius: "6px",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
    fontSize: "1.1em",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h4>{course.name}</h4>
      <p>Course ID: {course.id}</p>
      <p>Units: {course.unit}</p>
      <p>Season: {season}</p>
      <p>Year: {year}</p>
    </div>
  );
}

// DroppableQuarter Component with auto-animate
type DroppableQuarterProps = {
  id: string;
  season: string;
  year: string;
  children: React.ReactNode;
};

function DroppableQuarter({ id, season, year, children }: DroppableQuarterProps) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const parentRef = useRef(null);

  // Initialize auto-animate for smooth transitions
  useEffect(() => {
    parentRef.current && autoAnimate(parentRef.current);
  }, [parentRef]);

  const style = {
    backgroundColor: isOver ? "lightgreen" : "lightgrey",
    padding: "10px",
    minHeight: "100px",
    borderRadius: "4px",
  };

  const AddClass: React.FC<AddClassProp> = ({
    setAddingClass,
    setSelectedQuarter,
    season,
    year,
  }) => {
    return (
      <div className="items-center flex">
        <button
          onClick={() => {
            setAddingClass(true);
            setSelectedQuarter([season, year]);
          }}
        >
          <div className="rounded-sm transition ease-in-out delay-10 bg-slate-500 shadow-md hover:bg-slate-400 active:bg-slate-500 text-center p-2 mt-2">
            <text className="text-center text-white">Add Class</text>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{season} {year}</h3>
      <div ref={parentRef}>{children}</div> {/* Auto-animate applied here */}
    </div>
  );
}
