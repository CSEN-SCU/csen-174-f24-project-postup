/****
 * This a component that would show the Core Reqs. In case a separate UI has been made for this, I ensured that the functions are easily exported or
 * moved out.
 */

// import { auth, db } from "@/app/utils/firebase";
import React, { Dispatch, useState, SetStateAction, useEffect } from "react";
// hard-coded this for MVP -- in the future, use dynamic imports
import { core_reqs_ENGR } from "@/DegreeRequirements/Majors/CORE";
import {
  getFirestore,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { UserCourseData, currentUserPlan } from "@/app/utils/types";

// Goal: Retrieve user core requirements, compare to correct json file, do some magic
// Returns a tuple [reqs_fulfilled: int, reqs_left: string[], total_reqs: int]
const calculateCoreReqs = async (
  setCoreReqsInfo: Dispatch<SetStateAction<[number, string[], number] | null>>,
  currentUserClasses: UserCourseData[]
) => {
  if (!currentUserClasses) {
    console.log("no classes");
    return null;
  }

  const userCourses = new Set(
    currentUserClasses.flatMap(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (plan: any) =>
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
  console.log("TEST ", userCourses);

  // Combine core classes
  const allRequiredCourseIds = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...core_reqs_ENGR.flatMap((req: any) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      req.courses.map((course: any) => course.courseId)
    ),
  ];

  const db = getFirestore();

  const fulfilled = [];
  const unmet = [];
  for (const course of allRequiredCourseIds) {
    const querySnapshot = await getDocs(
      query(
        collection(db, "courses"),
        where("courseTags", "array-contains", course)
      )
    );

    let found = false;
    for (const doc of querySnapshot.docs) {
      console.log(doc.id, " => ", doc.data());
      if (userCourses.has(doc.id)) {
        fulfilled.push(course);
        found = true;
        break;
      }
    }

    if (!found) {
      unmet.push(course);
    }
  }

  const totalReqsLeft = allRequiredCourseIds.length - fulfilled.length;

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
