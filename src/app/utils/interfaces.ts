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
  setUserPlan: React.Dispatch<React.SetStateAction<UserCourseData[]>>;
  setAddingClass: React.Dispatch<React.SetStateAction<boolean>>;
  isAddingClass: boolean;
  selectedQuarter: [string, string];
  userPlan: UserCourseData[];
  // Function to handle submissions
  onSubmit?: (arg0: CourseData) => void;
  availableCourses: {
    course_name: string;
    course_id: string;
    units: string;
    prereqs: string[];
    coreqs: string[];
  }[];
  setAvailableCourses: (
    arg0: {
      course_name: string;
      course_id: string;
      units: string;
      prereqs: string[];
      coreqs: string[];
    }[]
  ) => void;
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
  availableCourses: {
    course_name: string;
    course_id: string;
    units: string;
    prereqs: string[];
    coreqs: string[];
  }[];
  setAvailableCourses: (
    arg0: {
      course_name: string;
      course_id: string;
      units: string;
      prereqs: string[];
      coreqs: string[];
    }[]
  ) => void;
}
