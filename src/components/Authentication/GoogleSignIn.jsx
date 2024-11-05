"use client"

import { auth } from '@/app/utils/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
      'login_hint': 'user@scu.edu'
    });
    

  try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
}

export const signOut = async () => {
  try {
    return auth.signOut
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}