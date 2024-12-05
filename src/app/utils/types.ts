// Keep types here, then import them as needed.

export type Course = {
  name: string;
  id: string;
  unit: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prerequisiteCourses?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  corequisiteCourses?: any;
};

export type UserCourseData = {
  season: string;
  year: string;
  courses: Course[];
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prerequisiteCourses?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  corequisiteCourses?: any;
};

export type CourseCardProps = {
  id: string;
  course: Course;
  season: string;
  year: string;
  handleRemove: (courseId: string, season: string, year: string) => void; 
};

export type DroppableQuarterProps = {
  id: string;
  season: string;
  year: string;
  children: React.ReactNode;
};

export type currentUserPlan = {
  userPlan: UserCourseData[];
};
