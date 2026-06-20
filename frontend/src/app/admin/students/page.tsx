"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StudentForm from "@/components/forms/StudentForm";
import {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudents,
} from "@/services/studentService";
import { Student, StudentFormData } from "@/types/student";
import { Plus } from "lucide-react";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const nd1Count = students.filter((s) => s.level === "ND1").length;
  const nd2Count = students.filter((s) => s.level === "ND2").length;
  const hnd1Count = students.filter((s) => s.level === "HND1").length;
  const hnd2Count = students.filter((s) => s.level === "HND2").length;

  const fetchStudents = async () => {
    try {
      const response = await getStudents();

      setStudents(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      student.fullname.toLowerCase().includes(search.toLowerCase()) ||
      student.matric_no.toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLastStudent = currentPage * studentsPerPage;

  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent,
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handleCreate = async (data: StudentFormData) => {
    await createStudent(data);

    setShowForm(false);

    fetchStudents();
  };

  const handleUpdate = async (data: StudentFormData) => {
    if (!editingStudent) return;

    await updateStudent(editingStudent.id, data);

    setEditingStudent(null);
    setShowForm(false);

    fetchStudents();
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Delete Student?");

    if (!confirmDelete) return;

    await deleteStudent(id);

    fetchStudents();
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Students</h1>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
        >
          <Plus size={18} />
          Add Student
        </button>
      </div>

      {showForm && (
        <div className="border rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingStudent ? "Edit Student" : "Add Student"}
          </h2>
          <StudentForm
            initialData={editingStudent || undefined}
            onSubmit={editingStudent ? handleUpdate : handleCreate}
          />
          <button
            onClick={() => {
              setEditingStudent(null);
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
          <h3 className="text-sm text-gray-500">ND1</h3>
          <p className="text-2xl font-bold">{nd1Count}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-500">ND2</h3>
          <p className="text-2xl font-bold">{nd2Count}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-500">HND1</h3>
          <p className="text-2xl font-bold">{hnd1Count}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-sm text-gray-500">HND2</h3>
          <p className="text-2xl font-bold">{hnd2Count}</p>
        </div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full mb-6"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <div className="border rounded-lg p-10 text-center">
          No Students Found
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-3 text-left">Matric No</th>

                <th className="p-3 text-left">Full Name</th>

                <th className="p-3 text-left">Department</th>

                <th className="p-3 text-left">Level</th>

                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="p-3">{student.matric_no}</td>
                  <td className="p-3">{student.fullname}</td>
                  <td className="p-3">{student.department}</td>
                  <td className="p-3">{student.level}</td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => {
                        setEditingStudent(student);
                        setShowForm(true);
                      }}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
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
      )}

      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="border px-4 py-2 rounded"
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="border px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </DashboardLayout>
  );
}
