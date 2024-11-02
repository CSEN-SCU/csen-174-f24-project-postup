import { UserCourseData } from "./types";

/** 
 * File for all our interfaces. Avoids bloat.
*/
export interface CourseData {
  name: string;
  id: string;
  unit: string;
}

export interface DragDropCardProps {
  setSelectedQuarter: React.Dispatch<React.SetStateAction<[string, string]>>;
  setUserPlan: React.Dispatch<React.SetStateAction<UserCourseData[]>>
  userPlan: UserCourseData[];
  // Function to handle submissions
  onSubmit?: (arg0: CourseData) => void;
}

export interface UserCourse {
  season: string;
  year: string;
  courses: CourseData[];
}

export interface AddClassProp {
  setSelectedQuarter: React.Dispatch<React.SetStateAction<[string, string]>>;
  season: string;
  year: string;
}
