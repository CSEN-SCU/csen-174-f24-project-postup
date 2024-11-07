"use client"

import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { auth } from "@/app/utils/firebase";

async function signOut() {
  try {
    console.log("SIGNING OUT", auth.currentUser);
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}


const SignOutButton = () => {
  return (
    <Button onClick={signOut} className={buttonVariants({variant:"outline"})}>
      <div>
        <p className="font-bold text-white">Sign Out</p>
      </div>
    </Button>
  );
};

export default SignOutButton;
