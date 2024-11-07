"use client"
import SignOutButton from "@/components/Authentication/SignOutButton";
import React, { useEffect, useState } from "react";
import { getUserDocument } from "@/components/UserData/userInfo";
import { auth } from "../utils/firebase";
import { DocumentData } from "firebase/firestore";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";


export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<DocumentData | null | undefined>(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userData = await getUserDocument();
        setUserInfo(userData);
      }
    };
    
    fetchUserInfo();
  }, []);
  return (
    <div className="grid grid-cols-1">
      <div className="flex flex-col items-center">
        <Avatar>
          <AvatarImage src={userInfo?.profilePicture} className="rounded-full"></AvatarImage>
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold mt-4">Welcome, {userInfo?.name}</h2>
      </div>

      <div className="shadow-xl p-4 rounded-md border border-gray-100">
        <p className="mt-1">
          <strong>Email: {userInfo?.email}</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Student ID #:</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Major: {userInfo?.major}</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Minor: {userInfo?.minor}</strong>{" "}
        </p>
        <p className="mt-1">
          <strong>Pathway:</strong>{" "}
        </p>
        <div className="mt-6 flex space-x-4">
          <button className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded">
            Edit Program of Study
          </button>
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
