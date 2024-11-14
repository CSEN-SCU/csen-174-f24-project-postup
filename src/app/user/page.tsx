"use client";
import SignOutButton from "@/components/Authentication/SignOutButton";
import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { DocumentData, doc, collection, onSnapshot } from "firebase/firestore";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import ChangeMajorMinor from "@/components/UserData/ChangeMajorMinor";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<DocumentData | null | undefined>(
    null
  );
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const collectionRef = collection(db, "users");
      const userDocRef = doc(collectionRef, currentUser?.uid);
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUserInfo(docSnapshot.data());
        }
      });
      
      return () => unsubscribe();
    } else {
      console.log(
        "Shouldn't be possible, means auth failed -- page.tsx under /user"
      );
    }
    return;
  }, [currentUser]);

  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col items-center">
        <Avatar>
          <AvatarImage
            src={userInfo?.profilePicture}
            className="rounded-full"
          ></AvatarImage>
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold mt-4">Welcome, {userInfo?.name}</h2>
      </div>

      <div className="shadow-xl p-4 rounded-md border border-gray-100">
        <p className="mt-1">
          <strong>Email: {userInfo?.email}</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Grade Year: {userInfo?.year}</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Major: {userInfo?.major}</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Minor: {userInfo?.minor}</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Pathway: {userInfo?.pathway}</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Standing: {userInfo?.standing}</strong>{" "}
        </p>
        <div className="mt-6 flex space-x-4">
          <Popover>
            <PopoverTrigger>
              <button className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded">
                Edit Program of Study
              </button>
            </PopoverTrigger>
            <PopoverContent className="ml-10">
              <ChangeMajorMinor />
            </PopoverContent>
          </Popover>
          <button className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded">
            Edit Transfer Credit
          </button>
        </div>
      </div>

      <div className="flex justify-between p-4">
        <button className="bg-gray-700 hover:bg-gray-500 text-white py-1 px-4 rounded">
          FAQ
        </button>
        <button className="bg-gray-700 hover:bg-gray-500 text-white py-1 px-4 rounded">
          About Us
        </button>
        <SignOutButton></SignOutButton>
      </div>
    </div>
  );
}
