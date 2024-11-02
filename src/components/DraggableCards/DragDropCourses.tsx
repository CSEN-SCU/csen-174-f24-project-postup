// components/DragDropCard.tsx
import React, {
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import {
  DndContext,
  DragEndEvent,
} from "@dnd-kit/core";
import { Course, UserCourseData } from "@/app/utils/types";
import AddClass from "../AddClass/AddClass";
import CourseCard from "./CourseCards";
import DroppableQuarter from "./DroppableQuarter";
import { DragDropCardProps } from "@/app/utils/interfaces";
// Initial course data

const DragDropCourses: React.FC<DragDropCardProps> = ({ setSelectedQuarter, onSubmit, setUserPlan, userPlan }) => {

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active.data.current) return;

    const { season: draggedSeason, year: draggedYear } = active.data
      .current as { season: string; year: string };
    const [targetSeason, targetYear] = (over.id as string).split("-");

    if (draggedSeason !== targetSeason || draggedYear !== targetYear) {
      const updatedQuarters = userPlan.map((quarter) => {
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
              ...quarter.courses.filter(
                (course): course is Course => course !== undefined
              ),
              active.data.current as Course,
            ],
          };
        }
        return quarter;
      }) as UserCourseData[];

      setUserPlan(updatedQuarters);
    }
  };

  const renderCourseCards = (season: string, year: string) => {
    const quarterCourses =
      userPlan.find((q) => q.season === season && q.year === year)?.courses ||
      [];

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
          {userPlan.map(({ season, year }) => (
            <DroppableQuarter
              key={`${season}-${year}`}
              id={`${season}-${year}`}
              season={season}
              year={year}
            >
              {renderCourseCards(season, year)}
              <AddClass
                setSelectedQuarter={setSelectedQuarter}
                season={season}
                year={year}
              />
            </DroppableQuarter>
          ))}
        </div>
      </div>
    </DndContext>
  );
}

export default DragDropCourses