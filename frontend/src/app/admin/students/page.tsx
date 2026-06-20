"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StudentForm from "@/components/forms/StudentForm";
import {
  createStudent,
  deleteStudent,
  getStudents,
} from "@/services/studentService";
import { Student, StudentFormData } from "@/types/student";
import { Plus } from "lucide-react";


export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();

      setStudents(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreate = async (data: StudentFormData) => {
    await createStudent(data);

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
          <StudentForm onSubmit={handleCreate} />
        </div>
      )}

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
              {students.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="p-3">{student.matric_no}</td>

                  <td className="p-3">{student.fullname}</td>

                  <td className="p-3">{student.department}</td>

                  <td className="p-3">{student.level}</td>

                  <td className="p-3">
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
    </DashboardLayout>
  );
}
