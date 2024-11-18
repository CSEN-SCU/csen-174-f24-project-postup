/****
 * This a component that would show the Major Reqs. In case a separate UI has been made for this, I ensured that the functions are easily exported or
 * moved out.
 */

import { auth, db } from "@/app/utils/firebase";
import React, { Dispatch, useState, SetStateAction, useEffect } from "react";
// hard-coded this for MVP -- in the future, use dynamic imports
import { requirements } from "@/DegreeRequirements/Majors/Computer_Science_and_Engineering";
import {
  getDoc,
  doc,
  collection,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";

// Goal: Retrieve user major, compare to correct json file, do some magic
// Returns a tuple [reqs_fulfilled: int, reqs_left: string[], total_reqs: int]
const calculateMajorReqs = (
  setMajorReqsInfo: Dispatch<SetStateAction<[number, string[], number] | null>>,
  currentUserClasses: any
) => {
  if (!currentUserClasses) {
    console.log("no classes");
    return null;
  }

  const userCourses = new Set(
    currentUserClasses.flatMap((plan: any) =>
      plan.courses.map((course: any) => course.id)
    )
  );

  // Combine major classes and elective classes
  const allRequiredCourseIds = [
    ...requirements[0].majorClasses.flatMap((req: any) => {
      // Main requirement: include course and alternatives
      if (req.alternatives) {
        return [
          req.courseId,
          ...req.alternatives.map((alt: any) => alt.courseId),
        ];
      }
      return [req.courseId];
    }),
    ...requirements[0].electiveClasses.flatMap((req: any) => {
      // Elective classes: handle as normal courses, no alternatives in this example
      return req.courseId;
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
  console.log("unmet ", unmet);

  const totalReqsLeft = allRequiredCourseIds.length - fulfilled.length;

  // Update the state with fulfilled, unmet, and total requirements
  setMajorReqsInfo([fulfilled.length, unmet, totalReqsLeft]);
};

const fetchUserPlan = async (setUserPlan: Dispatch<SetStateAction<any>>) => {
  const userId = auth.currentUser?.uid;
  try {
    const collectionRef = collection(db, "plans");
    const planDocRef = doc(collectionRef, userId);

    const listener = onSnapshot(planDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserPlan(data?.plan);
      } else {
        setUserPlan(null); // Handle case where document doesn't exist
      }
    });

    // Return unsubscribe function to clean up the listener when the component unmounts
    return listener;
  } catch (error) {
    console.log("Unable to check user info, MajorReqs.tsx", error);
  }
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

const MajorReqs = () => {
  const [userMajor, setUserMajor] = useState<string | null>(null);
  const [majorReqsInfo, setMajorReqsInfo] = useState<
    [number, string[], number] | null
  >(null);
  const [currentUserClasses, setCurrentUserClasses] =
    useState<DocumentData | null>(null);
  useEffect(() => {
    const fetchUserMajorInfo = async () => {
      await checkUserMajor(setUserMajor);
    };
    fetchUserMajorInfo();
  }, []);

  // Fetch user classes
  useEffect(() => {
    const fetchUserClasses = async () => {
      await fetchUserPlan(setCurrentUserClasses);
    };
    fetchUserClasses();
  }, []);

  useEffect(() => {
    if (
      userMajor === "Computer Science and Engineering" &&
      currentUserClasses
    ) {
      calculateMajorReqs(setMajorReqsInfo, currentUserClasses);
    }
  }, [userMajor, currentUserClasses]);
  // hardcoded for now, if we go beyond the MVP, we would want dynamic imports based on the user's major

  return majorReqsInfo ? (
    <div>
      <p className="text-lg font-bold">Major Requirements</p>
      <p><span className="font-bold">Requirements Fulfilled:  </span> {majorReqsInfo[0]}</p>
      <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '20px' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {majorReqsInfo[1].length > 0 ? (
          majorReqsInfo[1].map((courseId, index) => (
            <li key={index} style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
              {courseId}
            </li>
          ))
        ) : (
          <li>Congrats!!! No unmet requirements</li>
        )}
      </ul>
      </div>
      <p><span className="font-bold">Classes left to take:</span> {majorReqsInfo[2]}</p>
    </div>
  ) : (
    <div>
      <p> Oops! Select a major, or something went entirely wrong </p>
    </div>
  );
};

export default MajorReqs;
