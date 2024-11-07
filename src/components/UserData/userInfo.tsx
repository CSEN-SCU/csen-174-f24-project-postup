import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "@/app/utils/firebase";

export const getUserDocument = async () => {
  const user = auth.currentUser;
  if (user) {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        return userDoc.data(); // Return the user data
      } else {
        console.warn("User document does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user document:", error);
      throw error; // Optionally rethrow the error for further handling
    }
  }
  else {
    console.error ("No current user!");
    return;
  }
};