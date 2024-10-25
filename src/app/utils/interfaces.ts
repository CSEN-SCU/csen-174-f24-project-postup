/** 
 * File for all our interfaces. Avoids bloat.
*/
export interface CourseData {
  name: string;
  id: string;
  unit: string;
}

export interface AddClassTemplateProps {
  courseName?: string;
  courseId?: string;
  units?: string;
  // Function to handle submissions
  onSubmit?: (arg0: CourseData) => void;
}

export interface UserCourse {
  season: string;
  year: string;
  courses: CourseData[];
}

export interface AddClassProp {
  setAddingClass: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedQuarter: React.Dispatch<React.SetStateAction<[string, string]>>;
  season: string;
  year: string;
}