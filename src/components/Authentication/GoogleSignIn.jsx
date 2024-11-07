"use client";

import { auth } from "@/app/utils/firebase";

export const signOut = async () => {
  try {
    return auth.signOut;
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
};
