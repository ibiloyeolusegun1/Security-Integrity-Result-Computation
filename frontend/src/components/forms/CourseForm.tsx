"use client";

import { useState } from "react";
import { CourseFormData } from "@/types/course";

interface Props {
  onSubmit: (data: CourseFormData) => void;
  initialData?: CourseFormData;
}

export default function CourseForm({ onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<CourseFormData>({
    course_code: initialData?.course_code || "",
    course_title: initialData?.course_title || "",
    unit: initialData?.unit || 1,
    semester: initialData?.semester || "FIRST",
    level: initialData?.level || "ND1",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "unit" ? Number(e.target.value) : e.target.value,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
    >
      <input
        name="course_code"
        placeholder="Course Code"
        value={formData.course_code}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <input
        name="course_title"
        placeholder="Course Title"
        value={formData.course_title}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        name="unit"
        value={formData.unit}
        onChange={handleChange}
        className="w-full border p-3 rounded"
      />

      <select name="semester" value={formData.semester} onChange={handleChange}>
        <option>FIRST</option>
        <option>SECOND</option>
      </select>

      <select name="level" value={formData.level} onChange={handleChange}>
        <option>ND1</option>
        <option>ND2</option>
        <option>HND1</option>
        <option>HND2</option>
      </select>

      <button className="w-full bg-black text-white p-3 rounded">
        Save Course
      </button>
    </form>
  );
}
