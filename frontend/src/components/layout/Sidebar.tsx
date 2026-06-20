"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r">
      <div className="p-6 font-bold">Result Security</div>

      <nav className="flex flex-col gap-2 p-4">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/students">Students</Link>
        <Link href="/admin/courses">Courses</Link>
        <Link href="/admin/results">Results</Link>
        <Link href="/admin/audit-logs">Audit Logs</Link>
        <Link href="/admin/statistics">Statistics</Link>
      </nav>
    </aside>
  );
}
