/****
 * This a component that would show the Core Reqs. In case a separate UI has been made for this, I ensured that the functions are easily exported or
 * moved out.
 */

// import { auth, db } from "@/app/utils/firebase";
import React, { Dispatch, useState, SetStateAction, useEffect } from "react";
// hard-coded this for MVP -- in the future, use dynamic imports
import { core_reqs_ENGR } from "@/DegreeRequirements/Majors/CORE";
import { UserCourseData, currentUserPlan } from "@/app/utils/types";

// Goal: Retrieve user core requirements, compare to correct json file, do some magic
// Returns a tuple [reqs_fulfilled: int, reqs_left: string[], total_reqs: int]
const calculateCoreReqs = async (
  setCoreReqsInfo: Dispatch<SetStateAction<[number, string[], number] | null>>,
  currentUserClasses: UserCourseData[]
) => {
  if (!currentUserClasses) {
    console.log("No classes provided");
    return null;
  }

  // Extract user courseTags into a Set for efficient lookups
  const userCourses = new Set(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentUserClasses.flatMap((plan: any) =>
      plan.courses
        .filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (course: any) =>
            Array.isArray(course.courseTags) && course.courseTags.length > 0
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .flatMap((course: any) => course.courseTags)
    )
  );

  // Gather all required tags from core_reqs_ENGR
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allRequiredCourseIds = core_reqs_ENGR.flatMap((req: any) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req.courses.map((course: any) => course.courseId)
  );

  // Split fulfilled and unmet requirements
  const fulfilled = allRequiredCourseIds.filter((courseId) =>
    userCourses.has(courseId)
  );
  const unmet = allRequiredCourseIds.filter(
    (courseId) => !userCourses.has(courseId)
  );

  // Calculate total requirements
  const totalReqsLeft = unmet.length;

  // Update state
  setCoreReqsInfo([fulfilled.length, unmet, totalReqsLeft]);
};

const CoreReqs: React.FC<currentUserPlan> = ({ userPlan }) => {
  const [coreReqsInfo, setCoreReqsInfo] = useState<
    [number, string[], number] | null
  >(null);

  useEffect(() => {
    if (userPlan) {
      calculateCoreReqs(setCoreReqsInfo, userPlan);
    }
  }, [userPlan]);

  return coreReqsInfo ? (
    <div>
      <p className="text-lg font-bold">Core Requirements</p>
      <p>
        <span className="font-bold">Requirements Fulfilled: </span>{" "}
        {coreReqsInfo[0]}
      </p>
      <div style={{ maxHeight: "300px", overflowY: "auto", marginTop: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {coreReqsInfo[1].length > 0 ? (
            coreReqsInfo[1].map((courseId, index) => (
              <li
                key={index}
                style={{ padding: "8px", borderBottom: "1px solid #ccc" }}
              >
                {courseId}
              </li>
            ))
          ) : (
            <li>Congrats!!! No unmet requirements</li>
          )}
        </ul>
      </div>
      <p>
        <span className="font-bold">Classes left to take:</span>{" "}
        {coreReqsInfo[2]}
      </p>
    </div>
  ) : (
    <div>
      <p> Oops! Something went entirely wrong </p>
    </div>
  );
};

export default CoreReqs;
