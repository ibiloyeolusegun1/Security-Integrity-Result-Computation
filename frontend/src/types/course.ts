export interface Course {
  id: number;
  course_code: string;
  course_title: string;
  unit: number;
  semester: string;
  level: string;
}

export interface CourseFormData {
  course_code: string;
  course_title: string;
  unit: number;
  semester: string;
  level: string;
}
