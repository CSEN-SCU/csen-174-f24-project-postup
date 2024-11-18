import React, {useState} from 'react'
import { Button } from './ui/button'
import { db } from '@/app/utils/firebase'
import { setDoc, doc, collection } from "firebase/firestore";
import { auth } from "@/app/utils/firebase";
import { currentUserPlan } from '@/app/utils/types';


const SaveButton: React.FC<currentUserPlan> = ({userPlan}) => {
  const [saveComplete, setSaveComplete] = useState<boolean | null>(null);
  const user_id = auth?.currentUser?.uid;

  // Function to save plan to firebase.
  const savePlan = async () => {
    try {
      const collectionRef = collection(db, "plans"); // create a CollectionReference
      const docRef = doc(collectionRef, user_id);

      await setDoc(docRef, {
        plan: userPlan,
        createdAt: new Date(),
      });

      setSaveComplete(true); // update save status to true if save was completed
      setTimeout(() => setSaveComplete(null), 3000); // hide message after 3 seconds
    } catch (error) {
        console.error("Error saving", error)
        setSaveComplete(false); // setting save status to false if save was not complete/error
        setTimeout(() => setSaveComplete(null), 3000); // hide message after 3 seconds
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
        {saveComplete === true && <p className="text-green-500 absolute">Save complete!</p>}
        {saveComplete === false && <p className="text-red-500">Save Failed!</p>}
    </div>
  )
}

export default SaveButton