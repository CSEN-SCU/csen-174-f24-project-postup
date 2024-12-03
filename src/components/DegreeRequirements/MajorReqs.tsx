/****
 * This a component that would show the Major Reqs. In case a separate UI has been made for this, I ensured that the functions are easily exported or
 * moved out.
 */

import { auth, db } from "@/app/utils/firebase";
import React, { Dispatch, useState, SetStateAction, useEffect } from "react";
// hard-coded this for MVP -- in the future, use dynamic imports
import { requirements } from "@/DegreeRequirements/Majors/Computer_Science_and_Engineering";
import { getDoc, doc, collection } from "firebase/firestore";
import { UserCourseData, currentUserPlan } from "@/app/utils/types";

// Goal: Retrieve user major, compare to correct json file, do some magic
// Returns a tuple [reqs_fulfilled: int, reqs_left: string[], total_reqs: int]
const calculateMajorReqs = (
  setMajorReqsInfo: Dispatch<SetStateAction<[number, string[], number] | null>>,
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
    ...requirements[0].majorClasses.flatMap((req: any) => {
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

  const totalReqsLeft = allRequiredCourseIds.length - fulfilled.length;

  // Update the state with fulfilled, unmet, and total requirements
  setMajorReqsInfo([fulfilled.length, unmet, totalReqsLeft]);
};

const checkUserMajor = async (
  setUserMajor: Dispatch<SetStateAction<string | null>>
) => {
  const userId = auth.currentUser?.uid;
  try {
    const collectionRef = collection(db, "users");
    const userDocRef = doc(collectionRef, userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      // Document data is retrieved
      const data = docSnap.data();
      setUserMajor(data?.major);
    }
    // Otherwise, do nothing and we check for nullish behaviour in the main function
    return;
  } catch (error) {
    console.log("Unable to check user info, MajorReqs.tsx", error);
  }
};

const MajorReqs: React.FC<currentUserPlan> = ({ userPlan }) => {
  const [userMajor, setUserMajor] = useState<string | null>(null);
  const [majorReqsInfo, setMajorReqsInfo] = useState<
    [number, string[], number] | null
  >(null);
  useEffect(() => {
    const fetchUserMajorInfo = async () => {
      await checkUserMajor(setUserMajor);
    };
    fetchUserMajorInfo();
  }, []);

  useEffect(() => {
    if (userMajor === "Computer Science and Engineering" && userPlan) {
      calculateMajorReqs(setMajorReqsInfo, userPlan);
    }
  }, [userMajor, userPlan]);
  // hardcoded for now, if we go beyond the MVP, we would want dynamic imports based on the user's major

  return majorReqsInfo ? (
    <div>
      <p>
        <span className="font-bold">Requirements Fulfilled: </span>{" "}
        {majorReqsInfo[0]}
      </p>
      <div style={{ maxHeight: "300px", overflowY: "auto", marginTop: "20px" }}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {majorReqsInfo[1].length > 0 ? (
            majorReqsInfo[1].map((courseId, index) => (
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
        {majorReqsInfo[2]}
      </p>
    </div>
  ) : (
    <div>
      <p> Oops! Select a major, or something went entirely wrong </p>
    </div>
  );
};

export default MajorReqs;
