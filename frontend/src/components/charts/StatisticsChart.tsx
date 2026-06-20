"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  students: number;
  courses: number;
  results: number;
}

export default function StatisticsChart({ students, courses, results }: Props) {
  const data = [
    {
      name: "Students",
      value: students,
    },
    {
      name: "Courses",
      value: courses,
    },
    {
      name: "Results",
      value: results,
    },
  ];

  return (
    <div className="bg-white border rounded-xl p-6 mt-6">
      <h2 className="font-semibold mb-4">System Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
