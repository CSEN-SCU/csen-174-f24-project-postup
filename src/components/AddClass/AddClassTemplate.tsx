import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { AddClassTemplateProp } from "@/app/utils/interfaces";

/*
 * This component is the "popup" that appears when a user clicks the "Add Class" button.
 * The goal is to have the user fill out the number of units, course name, and course ID.
 */

const AddClassTemplate: React.FC<AddClassTemplateProp> = ({
  onSubmit,
  availableCourses,
  setAvailableCourses
}) => {
  const inputRefs = useRef<HTMLInputElement>(null);
  const [selectedClass, setSelectedClass]: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Dispatch<SetStateAction<any>>
  ] = useState();
  const [inputError, setInputError]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);

  // Search input states
  const [filteredCourses, setFilteredCourses] = useState(availableCourses);
  const [searchQuery, setSearchQuery] = useState("");
  // On component render, this will focus on the first input box
  useEffect(() => {
    inputRefs.current?.focus();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    setFilteredCourses(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      availableCourses.filter((course: any) =>
        course.courseListing.toLowerCase().includes(lowerCaseQuery)
      )
    );
  }, [searchQuery, availableCourses]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectCourse = (course: any) => {
    setSelectedClass(course);
    setSearchQuery(course.courseListing); // Update search input with the selected course
  };

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const course = filteredCourses[index];
    return (
      <div
        style={style}
        className="cursor-pointer p-2 hover:bg-gray-200"
        onClick={() => handleSelectCourse(course)}
      >
        {course.courseListing}
      </div>
    );
  };

  const handleAddCourse = () => {
    if (selectedClass) {
      onSubmit?.({
        name: selectedClass.title || "",
        id: selectedClass.courseId || "",
        unit: selectedClass.units || "",
      });
      const updatedAvailableCourses = availableCourses.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (course: any) => course.courseId !== selectedClass.courseId
      );
      setAvailableCourses(updatedAvailableCourses);
      setSelectedClass(null);
      setSearchQuery("");
    } else {
      setInputError(true);
      console.log("ERROR: Submission lacks input");
    }
  };

  return (
    <div className="border-2 #000 border-dashed p-4 rounded-md shadow-md px-8 mt-2 bg-slate-50 max-w-64 self-center">
      <input
        ref={inputRefs}
        type="text"
        placeholder="Search for a course..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-2"
      />
      <div className="h-48 border border-gray-300 rounded-md overflow-hidden">
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <List
              height={height}
              itemCount={filteredCourses.length}
              itemSize={35}
              width={width}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
      <div className="grid grid-cols-2">
        <div className="justify-end items-end flex">
          {inputError && (
            <text className="align-middle font-light text-sm underline text-red-600 decoration-red-600 decoration-2">
              Invalid inputs!
            </text>
          )}
        </div>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded w-full"
        onClick={handleAddCourse}
      >
        Add Course
      </button>
    </div>
  );
};

export default AddClassTemplate;
