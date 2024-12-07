"use client";

import React, { Dispatch, useState, SetStateAction, useEffect } from "react";
import { userCourses } from "@/components/UserData/userCourses";
import { CourseData } from "./utils/interfaces";
import { UserCourseData } from "./utils/types";
import NavBar from "../components/Navigation/NavBar";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth, db } from "./utils/firebase";
import { useRouter } from "next/navigation";
import { signOut } from "../components/Authentication/GoogleSignIn";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import sunBackgroundImage from "./scu_sunset.jpg";
import {
  doc,
  setDoc,
  onSnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import SaveButton from "@/components/SaveButton";
import DragDropCourses from "@/components/DraggableCards/DragDropCourses";
import MajorReqs from "@/components/DegreeRequirements/MajorReqs";
import CourseStatsCard from "@/components/CourseStatsCard";
import CoreReqs from "@/components/DegreeRequirements/CoreReqs";
import ElectiveReqs from "@/components/DegreeRequirements/Electives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Home() {
  const [selectedQuarter, setSelectedQuarter]: [
    [string, string],
    Dispatch<SetStateAction<[string, string]>>
  ] = useState(["", ""]);

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userPlan, setUserPlan] = useState<UserCourseData[]>(userCourses);
  const [addingClass, setAddingClass] = useState<boolean>(false);
  const [availableCourses, setAvailableCourses] = useState<{
    [x: string]: any;
  }>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (!user?.email?.includes("@scu.edu")) {
          console.warn("Non-SCU Emails are not allowed");
          await signOut();
          setUser(null);
          return;
        }
        setUser(user);
        await fetchUserPlan(setUserPlan);
        await getAvailableCourses();
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      login_hint: "user@scu.edu",
    });
    try {
      const UserCredential = await signInWithPopup(auth, provider);
      const user = UserCredential.user;
      if (user?.email?.includes("@scu.edu")) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          profilePicture: user.photoURL,
          major: "n/a",
          minor: "n/a",
        });
      } else return;
      router.push("/");
    } catch (error) {
      console.error("error signing in:", error);
    }
  };

  const fetchUserPlan = async (
    setUserPlan: Dispatch<SetStateAction<UserCourseData[]>>
  ) => {
    const userId = auth.currentUser?.uid;
    try {
      const collectionRef = collection(db, "plans");
      const planDocRef = doc(collectionRef, userId);

      const listener = onSnapshot(planDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserPlan(data?.plan);
        }
      });

      return listener;
    } catch (error) {
      console.log("Unable to check user info, MajorReqs.tsx", error);
    }
  };

  const getAvailableCourses = async () => {
    try {
      const collectionRef = collection(db, "courses");
      const query = await getDocs(collectionRef);
      const courses = query.docs.map((doc) => ({
        ...doc.data(),
      }));
      setAvailableCourses(courses);

      return courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  };

  const onSubmit = (addedCourse: CourseData) => {
    let coreqs = [];
    console.log(addedCourse);
    console.log(availableCourses[0]);
    for (const course of availableCourses as any) {
      if (course.courseId === addedCourse.id) {
        coreqs = course.corequisiteCourses;
        break;
      }
    }
    coreqs = coreqs.map((coreq: string) =>
      coreq.startsWith("COEN") ? coreq.replace("COEN", "CSEN") : coreq
    );

    const matchingCourses = [];
    for (const course of availableCourses as any) {
      if (coreqs.includes(course.courseId)) {
        matchingCourses.push({
          name: course.title,
          id: course.courseListing,
          unit: course.units,
          courseTags: course.courseTags,
        });
      }
    }
    console.log(matchingCourses);

    const updatedAvailableCourses = availableCourses.filter(
      (course: any) => !coreqs.includes(course.courseId)
    );
    setAvailableCourses(updatedAvailableCourses);

    for (const course of matchingCourses) {
      setUserPlan((prevUserPlan) =>
        prevUserPlan.map((quarter) => {
          if (
            quarter.season === selectedQuarter[0] &&
            quarter.year === selectedQuarter[1]
          ) {
            return {
              ...quarter,
              courses: [...quarter.courses, course],
            };
          }
          return quarter;
        })
      );
    }

    setUserPlan((prevUserPlan) =>
      prevUserPlan.map((quarter) => {
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

    setSelectedQuarter(["", ""]);
    setAddingClass(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {user ? (
        <div className="flex flex-col">
          <NavBar isLoggedIn={true} selectedPage={"Home"} />

          {/* Save Button positioned to the right */}
          <div className="fixed bottom-6 right-10 z-50">
            <SaveButton userPlan={userPlan} />
          </div>

          <div className="w-full max-w-screen-2xl mx-auto p-8">
            {/* Course Stats Card */}
            <div style={{ marginBottom: "20px" }}>
              <CourseStatsCard userPlan={userPlan} />
            </div>
            {/* Accordian Feature for Organization */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="col-span-1 space-y-8">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="major-requirements">
                    <AccordionTrigger style={{ fontWeight: "bold" }}>
                      Major Requirements
                    </AccordionTrigger>
                    <AccordionContent>
                      <MajorReqs userPlan={userPlan} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="core-requirements">
                    <AccordionTrigger style={{ fontWeight: "bold" }}>
                      Core Requirements
                    </AccordionTrigger>
                    <AccordionContent>
                      <CoreReqs userPlan={userPlan} />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="elective-requirements">
                    <AccordionTrigger style={{ fontWeight: "bold" }}>
                      Elective Requirements
                    </AccordionTrigger>
                    <AccordionContent>
                      <ElectiveReqs userPlan={userPlan} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="col-span-4">
                <DragDropCourses
                  setSelectedQuarter={setSelectedQuarter}
                  selectedQuarter={selectedQuarter}
                  onSubmit={onSubmit}
                  setUserPlan={setUserPlan}
                  setAddingClass={setAddingClass}
                  isAddingClass={addingClass}
                  userPlan={userPlan}
                  availableCourses={availableCourses}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex justify-center items-center h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${sunBackgroundImage.src})` }}
        >
          <div className="flex flex-col items-center space-y-4 bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
              SCU Course Planner
            </h1>
            <p className="text-lg text-gray-700 text-center mb-6">
              Sign in with your SCU email to access your course planner and
              manage your academic journey.
            </p>
            <Button
              onClick={async () => {
                try {
                  await signInWithGoogle();
                } catch (error) {
                  console.error("Error signing in:", error);
                }
              }}
              className="px-8 py-4 text-xl bg-blue-500 text-white rounded-lg flex items-center space-x-3 hover:bg-blue-600 transition-colors"
            >
              <Mail className="w-6 h-6" />
              <span>Sign in with Google</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
