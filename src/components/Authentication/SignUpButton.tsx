import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { getAuth } from "firebase/auth";
import { app } from "@/app/utils/firebase";

async function signOut() {
  try {
    const auth = getAuth(app);
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}


const SignUpButton = () => {
  return (
    <Button onClick={signOut} className={buttonVariants({variant:"outline"})}>
      <div>
        <p className="font-bold">Sign Out</p>
      </div>
    </Button>
  );
};

export default SignUpButton;
