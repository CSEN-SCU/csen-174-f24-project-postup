/****
 * This a component that would show the Core Reqs. In case a separate UI has been made for this, I ensured that the functions are easily exported or
 * moved out.
 */

// import { auth, db } from "@/app/utils/firebase";
import React, { Dispatch, useState, SetStateAction, useEffect } from "react";
// hard-coded this for MVP -- in the future, use dynamic imports
import { requirements } from "@/DegreeRequirements/Majors/Computer_Science_and_Engineering";
import { UserCourseData, currentUserPlan } from "@/app/utils/types";

// Goal: Retrieve user core requirements, compare to correct json file, do some magic
// Returns a tuple [reqs_fulfilled: int, reqs_left: string[], total_reqs: int]
const calculateElectiveReqs = async (
  setelectiveReqs: Dispatch<SetStateAction<[number, string[], number] | null>>,
  currentUserClasses: UserCourseData[]
) => {
    if (!currentUserClasses) {
        console.log("no classes");
        return null;
      }
      // console.log(currentUserClasses);
    
      const userCourses = new Set(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        currentUserClasses.flatMap((plan: any) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          plan.courses.map((course: any) => course.id)
        )
      );
    
      // Combine major classes and elective classes
      const allRequiredCourseIds = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...requirements[0].electiveClasses.flatMap((req: any) => {
          // Main requirement: include course and alternatives
          if (req.alternatives) {
            return [
              req.courseId,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...req.alternatives.map((alt: any) => alt.courseId),
            ];
          }
          return [req.courseId];
        }),
      ];
    
      // console.log("allRequiredCourseIds ", allRequiredCourseIds);
    
      // Fulfilled requirements: check if the user has completed the required courses
      const fulfilled = allRequiredCourseIds.filter((courseId) =>
        userCourses.has(courseId)
      );
      // console.log("fulfilled ", fulfilled);
    
      // Unmet requirements: courses that the user hasn't completed
      const unmet = allRequiredCourseIds.filter(
        (courseId) => !userCourses.has(courseId)
      );
    
      const totalReqsLeft = 3 - fulfilled.length;
    
      // Update the state with fulfilled, unmet, and total requirements
      setelectiveReqs([fulfilled.length, unmet, totalReqsLeft]);
};

const ElectiveReqs: React.FC<currentUserPlan> = ({ userPlan }) => {
  const [electiveReqs, setelectiveReqs] = useState<
    [number, string[], number] | null
  >(null);

  useEffect(() => {
    if (userPlan) {
      calculateElectiveReqs(setelectiveReqs, userPlan);
    }
  }, [userPlan]);

  return electiveReqs ? (
    <div>
      <p className="text-lg font-bold">Elective Requirements</p>
      <p>
        <span className="font-bold">Requirements Fulfilled: </span>{" "}
        {electiveReqs[0]}
      </p>
      <div style={{ maxHeight: "300px", overflowY: "auto", marginTop: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {electiveReqs[1].length > 0 ? (
            electiveReqs[1].map((courseId, index) => (
              <li
                key={index}
                style={{ padding: "8px", borderBottom: "1px solid #ccc" }}
              >
                {courseId.replace("_", " ")}
              </li>
            ))
          ) : (
            <li>Congrats!!! No unmet requirements</li>
          )}
        </ul>
      </div>
      <p>
        <span className="font-bold">Classes left to take:</span>{" "}
        {electiveReqs[2]}
      </p>
    </div>
  ) : (
    <div>
      <p> Oops! Something went entirely wrong </p>
    </div>
  );
};

export default ElectiveReqs;
