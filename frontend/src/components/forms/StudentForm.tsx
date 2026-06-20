"use client";

import { useState } from "react";

interface Props {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function StudentForm({ onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState({
    matric_no: initialData?.matric_no || "",
    fullname: initialData?.fullname || "",
    department: initialData?.department || "",
    level: initialData?.level || "ND1",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <input
        name="matric_no"
        placeholder="Matric Number"
        className="w-full border p-3 rounded"
        value={formData.matric_no}
        onChange={handleChange}
      />

      <input
        name="fullname"
        placeholder="Full Name"
        className="w-full border p-3 rounded"
        value={formData.fullname}
        onChange={handleChange}
      />

      <input
        name="department"
        placeholder="Department"
        className="w-full border p-3 rounded"
        value={formData.department}
        onChange={handleChange}
      />

      <select
        name="level"
        className="w-full border p-3 rounded"
        value={formData.level}
        onChange={handleChange}
      >
        <option>ND1</option>
        <option>ND2</option>
        <option>HND1</option>
        <option>HND2</option>
      </select>

      <button className="w-full bg-black text-white p-3 rounded">
        Save Student
      </button>
    </form>
  );
}
