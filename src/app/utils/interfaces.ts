import { UserCourseData } from "./types";

/**
 * File for all our interfaces. Avoids bloat.
 */
export interface CourseData {
  name: string;
  id: string;
  unit: string;
  courseTags?: [];
  description?: string;
  courseListing?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prerequisiteCourses?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  corequisiteCourses?: any;
}

export interface DragDropCardProps {
  setSelectedQuarter: React.Dispatch<React.SetStateAction<[string, string]>>;
  setUserPlan: React.Dispatch<React.SetStateAction<UserCourseData[]>>;
  setAddingClass: React.Dispatch<React.SetStateAction<boolean>>;
  isAddingClass: boolean;
  selectedQuarter: [string, string];
  userPlan: UserCourseData[];
  // Function to handle submissions
  onSubmit?: (arg0: CourseData) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  availableCourses: { [x: string]: any };
}

export interface UserCourse {
  season: string;
  year: string;
  courses: CourseData[];
}

export interface AddClassProp {
  setSelectedQuarter: React.Dispatch<React.SetStateAction<[string, string]>>;
  setAddingClass: React.Dispatch<React.SetStateAction<boolean>>;
  season: string;
  year: string;
}

export interface AddClassTemplateProp {
  onSubmit?: (arg0: CourseData) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  availableCourses: { [x: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userPlan: any;
}
