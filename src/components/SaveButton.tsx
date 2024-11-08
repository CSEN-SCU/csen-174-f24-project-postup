import React, {useState} from 'react'
import { Button } from './ui/button'
import { db } from '@/app/utils/firebase'
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth } from "@/app/utils/firebase";
import { UserCourseData } from '@/app/utils/types';


type currentUserPlan = {
  userPlan: UserCourseData[];
}

const SaveButton: React.FC<currentUserPlan> = ({userPlan}) => {
  const [saveComplete, setSaveComplete] = useState(false);
  const user_id = auth?.currentUser?.uid;

  // Function to save plan to firebase.
  const savePlan = async () => {
    try {
      const docRef = doc(db, "plans", user_id);

      await setDoc(docRef, {
        plan: userPlan,
        createdAt: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);
      setSaveComplete(true); // update save status to true if save was completed
      setTimeout(() => setSaveComplete(false), 3000); // hide message after 3 seconds
    } catch (error) {
        console.error("Error saving", error)
        setSaveComplete(false); // setting save status to false if save was not complete/error
    }
  };

  return (
    <div>
        <Button variant="outline" onClick={() => {
        savePlan();
        }}>
            <div>
                <p className='text-white'>Save</p>
            </div>
        </Button>
        {saveComplete && <p className="text-green-500 mt-2">Save complete!</p>}
    </div>
  )
}

export default SaveButton