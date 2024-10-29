// components/DragDropCard.tsx
import React, { useState, useEffect, useRef } from "react";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import autoAnimate from "@formkit/auto-animate";

// Initial course data
const initialCourses = [
  {
    season: "Fall",
    year: "2021",
    courses: [{ name: "Operating Systems", id: "CSEN 177", unit: "4" }],
  },
  /*{
    season: "Fall",
    year: "2022",
    courses: [
      { name: "Programming Languages", id: "CSEN 171", unit: "4" },
      { name: "Software Engineering", id: "CSEN 174", unit: "4" },
    ],
},*/
  // Additional quarters and courses as needed...
];

// Type definitions for course structure
type Course = { name: string; id: string; unit: string };
type Quarter = { season: string; year: string; courses: Course[] };

// Main Drag and Drop Component
export default function DragDropCourses() {
  const [quarters, setQuarters] = useState<Quarter[]>(initialCourses);

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
    padding: "10px",
    margin: "5px",
    backgroundColor: "lightblue",
    cursor: "grab",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
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

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{season} {year}</h3>
      <div ref={parentRef}>{children}</div> {/* Auto-animate applied here */}
    </div>
  );
}
