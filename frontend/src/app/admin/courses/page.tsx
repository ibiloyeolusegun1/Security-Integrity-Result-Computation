"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CourseForm from "@/components/forms/CourseForm";

import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
} from "@/services/courseService";

import { Course, CourseFormData } from "@/types/course";

import { Plus } from "lucide-react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [search, setSearch] = useState("");

  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 10;

  const fetchCourses = async () => {
    try {
      const response = await getCourses();

      setCourses(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.course_title.toLowerCase().includes(search.toLowerCase()) ||
      course.course_code.toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLastCourse = currentPage * coursesPerPage;

  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse,
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handleCreate = async (data: CourseFormData) => {
    await createCourse(data);

    setShowForm(false);

    fetchCourses();
  };

  const handleUpdate = async (data: CourseFormData) => {
    if (!editingCourse) return;

    await updateCourse(editingCourse.id, data);

    setEditingCourse(null);
    setShowForm(false);

    fetchCourses();
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Delete Course?");

    if (!confirmed) return;

    await deleteCourse(id);

    fetchCourses();
  };

  const nd1Courses = courses.filter((course) => course.level === "ND1").length;

  const nd2Courses = courses.filter((course) => course.level === "ND2").length;

  const hnd1Courses = courses.filter(
    (course) => course.level === "HND1",
  ).length;

  const hnd2Courses = courses.filter(
    (course) => course.level === "HND2",
  ).length;

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>

        <button
          onClick={() => {
            setEditingCourse(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
        >
          <Plus size={18} />
          Add Course
        </button>
      </div>

      {showForm && (
        <div className="border rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingCourse ? "Edit Course" : "Add Course"}
          </h2>

          <CourseForm
            initialData={editingCourse || undefined}
            onSubmit={editingCourse ? handleUpdate : handleCreate}
          />

          <button
            onClick={() => {
              setEditingCourse(null);
              setShowForm(false);
            }}
            className="mt-3 px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-500">ND1 Courses</h3>

          <p className="text-2xl font-bold">{nd1Courses}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-500">ND2 Courses</h3>

          <p className="text-2xl font-bold">{nd2Courses}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-500">HND1 Courses</h3>

          <p className="text-2xl font-bold">{hnd1Courses}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-500">HND2 Courses</h3>

          <p className="text-2xl font-bold">{hnd2Courses}</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full mb-6"
      />

      {loading ? (
        <p>Loading...</p>
      ) : currentCourses.length === 0 ? (
        <div className="border rounded-lg p-10 text-center">
          No Courses Found
        </div>
      ) : (
        <>
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Code</th>

                  <th className="p-3 text-left">Title</th>

                  <th className="p-3 text-left">Unit</th>

                  <th className="p-3 text-left">Semester</th>

                  <th className="p-3 text-left">Level</th>

                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentCourses.map((course) => (
                  <tr key={course.id} className="border-b">
                    <td className="p-3">{course.course_code}</td>

                    <td className="p-3">{course.course_title}</td>

                    <td className="p-3">{course.unit}</td>

                    <td className="p-3">{course.semester}</td>

                    <td className="p-3">{course.level}</td>

                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => {
                          setEditingCourse(course);

                          setShowForm(true);
                        }}
                        className="text-blue-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(course.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="border px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="border px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
