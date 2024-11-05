"use client"; // "The component gets prerendered with SSR or ISR/SSG if possible on the server. The html is send to the client and the javascript is send too. So it gets hydrated on the client and is interactive"

import DragDropCourses from "@/components/DraggableCards/DragDropCourses";
import React, { Dispatch, useState, SetStateAction, useEffect } from "react";
import { userCourses } from "@/components/UserData/userCourses";
import { CourseData } from "./utils/interfaces";
import { UserCourseData } from "./utils/types";
import NavBar from "../components/Navigation/NavBar";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./utils/firebase";
import { useRouter } from 'next/navigation';


export default function Home() {
  const [selectedQuarter, setSelectedQuarter]: [
    [string, string],
    Dispatch<SetStateAction<[string, string]>>
  ] = useState(["", ""]);

  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState<UserCourseData[]>(userCourses);
  const [addingClass, setAddingClass] = useState<boolean>(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      router.push("/")
    } catch (error) {
      console.error("error signing in");
    }
  }

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
    // reset the selected quarter and the state of adding classes
    setSelectedQuarter(["", ""]);
    setAddingClass(false);
  };

  return (
    <div>
      {user ? (
      <div className="flex flex-col">
      <div className="flex w-full">
        <NavBar isLoggedIn={true} selectedPage={"Home"}></NavBar>
      </div>
      <div className="grid items-start justify-items-end min-h-screen p-8 pb-10 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <DragDropCourses
          setSelectedQuarter={setSelectedQuarter}
          selectedQuarter={selectedQuarter}
          onSubmit={onSubmit}
          setUserPlan={setUserPlan}
          setAddingClass={setAddingClass}
          isAddingClass={addingClass}
          userPlan={userPlan}
        />
      </div>
    </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
            <button onClick={signInWithGoogle} className="px-5 py-2 text-lg bg-blue-500 text-white rounded">
                Sign in with Google
            </button>
        </div>
      )}
    </div>
  );
}
