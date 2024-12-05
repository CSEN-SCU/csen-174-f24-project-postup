// Keep types here, then import them as needed.

export type Course = {
  name: string;
  id: string;
  unit: string;
  description?: string;
  prerequisites?: string;
  corequisites?: string;
};

export type UserCourseData = {
  season: string;
  year: string;
  courses: Course[];
  description?: string;
  prerequisites?: string;
  corequisites?: string;
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
