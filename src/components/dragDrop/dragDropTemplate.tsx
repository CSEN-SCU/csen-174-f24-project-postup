// components/DraggableCourseList.tsx

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import Course from '../course';     
import Quarter from '../Quarter';   

// Define types
interface CourseType {
  name: string;
  id: string;
  unit: string;
}

interface QuarterType {
  season: string;
  year: string;
  courses: CourseType[];
}

// User courses data organized by quarters
export const userCourses: QuarterType[] = [
  { season: 'Fall', year: '2021', courses: [{ name: 'Operating Systems', id: 'CSEN 177', unit: '4' }] },
  { season: 'Winter', year: '2021', courses: [{ name: 'Operating Systems', id: 'CSEN 177', unit: '4' }] },
  { season: 'Spring', year: '2021', courses: [{ name: 'Operating Systems', id: 'CSEN 177', unit: '4' }] },
  { season: 'Fall', year: '2022', courses: [
      { name: 'Programming Languages', id: 'CSEN 171', unit: '4' },
      { name: 'Software Engineering', id: 'CSEN 174', unit: '4' },
    ],
  },
  // (continue adding other quarters here)
];

const DraggableCourseList: React.FC = () => {
  const [quarters, setQuarters] = useState<QuarterType[]>(userCourses);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceQuarterIndex = parseInt(result.source.droppableId, 10);
    const destQuarterIndex = parseInt(result.destination.droppableId, 10);

    // Clone the quarters
    const sourceQuarter = { ...quarters[sourceQuarterIndex] };
    const destQuarter = { ...quarters[destQuarterIndex] };

    // Reorder courses between quarters
    const [movedCourse] = sourceQuarter.courses.splice(result.source.index, 1);
    destQuarter.courses.splice(result.destination.index, 0, movedCourse);

    // Update quarters
    const updatedQuarters = Array.from(quarters);
    updatedQuarters[sourceQuarterIndex] = sourceQuarter;
    updatedQuarters[destQuarterIndex] = destQuarter;

    setQuarters(updatedQuarters);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {quarters.map((quarter, quarterIndex) => (
        <Droppable key={quarterIndex} droppableId={quarterIndex.toString()}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ margin: '16px 0', padding: '16px', border: '1px solid gray' }}
            >
              {/* Render Quarter component with season and year */}
              <Quarter quarterSeason={quarter.season} year={quarter.year} />

              <ul style={{ listStyle: 'none', padding: 0 }}>
                {quarter.courses.map((course, courseIndex) => (
                  <Draggable
                    key={course.id}
                    draggableId={course.id}
                    index={courseIndex}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: '8px',
                          margin: '4px 0',
                          backgroundColor: 'lightgray',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {/* Render Course component with course details */}
                        <Course courseName={course.name} id={course.id} unit={course.unit} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default DraggableCourseList;
