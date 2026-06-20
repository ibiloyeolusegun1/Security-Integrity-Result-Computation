export interface ResultFormData {
  student_id: number;
  course_id: number;

  ca_score: number;
  test_score: number;
  exam_score: number;

  session: string;
  semester: string;
}

export interface ComputedResult {
  total_score: number;
  grade: string;
  grade_point: number;
  quality_point: number;
}
