import { Input } from "@/components/ui/input";
import React, {
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { AddClassTemplateProp } from "@/app/utils/interfaces";
import { availableCourseList } from "../DummyData/AvailableCourses";

/*
 * This component is the "popup" that appears when a user clicks the "Add Class" button.
 * The goal is to have the user fill out the number of units, course name, and course ID.
 */

const AddClassTemplate: React.FC<AddClassTemplateProp> = ({ onSubmit }) => {
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

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

  // This function allows for arrow keys to be used to go up and down input boxes
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "ArrowDown" && index < inputRefs.length - 1)
      inputRefs[index + 1]?.current?.focus(); // Move to the next input
    if (e.key === "ArrowUp" && index > 0)
      inputRefs[index - 1]?.current?.focus(); // Move to the previous input
    // TODO: Add a "Submit" button or allow the user to click outside the popup to add classes. Right now, the "Enter" key works.
    if (e.key === "Enter") {
      if (inputRefs.every((ref) => ref.current?.value.trim() !== "")) {
        onSubmit?.({
          name: inputRefs[0].current?.value || "",
          id: inputRefs[1].current?.value || "",
          unit: inputRefs[2].current?.value || "",
        });
      } else {
        setInputError(true);
        console.log("ERROR: Submission lacks input");
      }
    }
  };

  // Define the handleSelectChange function
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const selectedValue = e.target.value;
    if (inputRefs[index].current) {
      inputRefs[index].current.value = selectedValue;
    }
  };

  return (
    <div className="border-2 #000 border-dashed p-4 rounded-md shadow-md px-8 mt-2 bg-slate-50 max-w-64 self-center">
      <select
        ref={inputRefs[1]}
        className="mt-2 w-1/2"
        onChange={(e) => handleSelectChange(e, 1)}
      >
        <option value="" disabled selected>
          Course ID
        </option>
        {availableCourseList.map((course) => (
          <option key={course.course_id} value={course.course_id}>
            {course.course_id}
          </option>
        ))}
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
              name: inputRefs[0].current?.value || "",
              id: inputRefs[1].current?.value || "",
              unit: inputRefs[2].current?.value || "",
            });
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
