"use client"; // "The component gets prerendered with SSR or ISR/SSG if possible on the server. The html is send to the client and the javascript is send too. So it gets hydrated on the client and is interactive"

import AddClass from "@/components/UserData/AddClass";
import AddClassTemplate from "@/components/AddClass/AddClassTemplate";
import DragDropCourses from "@/components/dragDropCard";
import Quarter from "@/components/Quarter";
import React, { Dispatch, useState, SetStateAction } from "react";
import { userCourses } from "@/components/UserData/userCourses";
import { UserCourse, CourseData } from "./utils/interfaces";
import NavBar from "@/components/navigation/NavBar";

export default function Home() {
  const [isAddingClass, setAddingClass]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const [selectedQuarter, setSelectedQuarter]: [
    [string, string],
    Dispatch<SetStateAction<[string, string]>>
  ] = useState(["", ""]);
  // State to hold the user's 4 year plan. So we're not manipulating the actual document holding the 4yp yet, but rather creating a "temp" variable that the user can save later.
  const [userPlan, setUserPlan] = useState<UserCourse[]>(userCourses);

  const onSubmit = (addedCourse: CourseData) => {
    setUserPlan((prevUserPlan) =>
      prevUserPlan.map((quarter) => {
        // find the matching quarter + year pair. Then add the course to that.
        if (
          quarter.season === selectedQuarter[0] &&
          quarter.year === selectedQuarter[1]
        ) {
          return {
            ...quarter,
            courses: [...quarter.courses, addedCourse],
          };
        }
        return quarter;
      })
    );
    setAddingClass(false);
    setSelectedQuarter(["", ""]);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        <NavBar isLoggedIn={true} selectedPage={"Home"}></NavBar>
      </div>
      <div className="grid items-start justify-items-end min-h-screen p-8 pb-10 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <DragDropCourses/>
       </div>
    </div>
  );
}
