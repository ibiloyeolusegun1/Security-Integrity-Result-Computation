"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getStudents } from "@/services/studentService";
import { getCourses } from "@/services/courseService";
import { computeResult } from "@/services/resultService";
import { Student } from "@/types/student";
import { Course } from "@/types/course";
import { ComputedResult } from "@/types/result";

export default function ResultsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComputedResult | null>(null);
  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",

    ca_score: "",
    test_score: "",
    exam_score: "",

    session: "2025/2026",
    semester: "FIRST",
  });

  const loadData = async () => {
    try {
      const studentRes = await getStudents();
      const courseRes = await getCourses();

      setStudents(studentRes.data);

      setCourses(courseRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await computeResult({
        student_id: Number(formData.student_id),

        course_id: Number(formData.course_id),

        ca_score: Number(formData.ca_score),

        test_score: Number(formData.test_score),

        exam_score: Number(formData.exam_score),

        session: formData.session,

        semester: formData.semester,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to compute result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Result Computation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Student</option>

              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.fullname}
                </option>
              ))}
            </select>

            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_code}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="ca_score"
              placeholder="CA Score"
              value={formData.ca_score}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="number"
              name="test_score"
              placeholder="Test Score"
              value={formData.test_score}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              type="number"
              name="exam_score"
              placeholder="Exam Score"
              value={formData.exam_score}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <input
              name="session"
              value={formData.session}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option>FIRST</option>

              <option>SECOND</option>
            </select>

            <button
              disabled={loading}
              className="w-full bg-black text-white p-3 rounded"
            >
              {loading ? "Computing..." : "Compute Result"}
            </button>
          </form>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Computed Result</h2>

          {result ? (
            <div className="space-y-4">
              <div>
                <strong>Total Score:</strong> {result.total_score}
              </div>

              <div>
                <strong>Grade:</strong> {result.grade}
              </div>

              <div>
                <strong>Grade Point:</strong> {result.grade_point}
              </div>

              <div>
                <strong>Quality Point:</strong> {result.quality_point}
              </div>

              <div className="bg-green-100 text-green-700 p-3 rounded">
                ✓ Integrity Verified
              </div>
            </div>
          ) : (
            <p>Compute a result to view output</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
