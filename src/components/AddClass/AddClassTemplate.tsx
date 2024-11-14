import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { AddClassTemplateProp } from "@/app/utils/interfaces";

/*
 * This component is the "popup" that appears when a user clicks the "Add Class" button.
 * The goal is to have the user fill out the number of units, course name, and course ID.
 */

const AddClassTemplate: React.FC<AddClassTemplateProp> = ({
  onSubmit,
  availableCourses,
  setAvailableCourses,
}) => {
  const inputRefs = [
    // to get rid of this I need to overhaul this, naurrr
    useRef<HTMLInputElement>(null),
    useRef<HTMLSelectElement>(null)
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedClass, setSelectedClass]: [any, Dispatch<SetStateAction<any>>] = useState();
  const [inputError, setInputError]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);

  // On component render, this will focus on the first input box
  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  });

  // Define the handleSelectChange function
  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const selectedValue = e.target.value;
    // Pure insanity -raph
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const course = availableCourses.find((course:any) => course.courseId === selectedValue);
    console.log("Incredible", course);
    setSelectedClass(course); // Store the selected course object in state
    if (inputRefs[index].current) {
      inputRefs[index].current.value = selectedValue;
    }
  };

  return (
    <div className="border-2 #000 border-dashed p-4 rounded-md shadow-md px-8 mt-2 bg-slate-50 max-w-64 self-center">
      <select
        ref={inputRefs[1] as React.RefObject<HTMLSelectElement>}
        className="mt-2 w-fit p-3 rounded-md"
        onChange={(e) => handleSelectChange(e, 1)}
      >
        <option value="" disabled selected>
          Course ID
        </option>

        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          availableCourses.map((course: any) => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseListing}
            </option>
          ))
        }
      </select>
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
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => {
          if (inputRefs.every((ref) => ref.current?.value.trim() !== "")) {
            onSubmit?.({
              name: selectedClass?.title || "",
              id: inputRefs[1].current?.value || "",
              unit: selectedClass?.units || "",
            });
            const courseNameToRemove = inputRefs[1].current?.value;
            if (courseNameToRemove) {
              const updatedAvailableCourses = availableCourses.filter(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (course: any) => course.courseId !== courseNameToRemove
              );
              setAvailableCourses(updatedAvailableCourses);
            }
          } else {
            setInputError(true);
            console.log("ERROR: Submission lacks input");
          }
        }}
      >
        Add Course
      </button>
    </div>
  );
};

export default AddClassTemplate;
