"use client";

import { auth, db } from "@/app/utils/firebase";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    login_hint: "user@scu.edu",
  });
  console.log("USER INFO 212:", user.email)

  try {
    const UserCredential = await signInWithPopup(auth, provider);
    const user = UserCredential.user;

    // Add user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      profilePicture: user.photoURL
    });

  } catch (error) {
    console.error("Error signing in with Google", error);
  }
};

export const signOut = async () => {
  try {
    return auth.signOut;
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
};
