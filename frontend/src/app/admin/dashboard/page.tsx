import DashboardLayout from "@/components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-4">
        <div className="border p-6 rounded-lg">Total Students</div>

        <div className="border p-6 rounded-lg">Total Courses</div>

        <div className="border p-6 rounded-lg">Total Results</div>

        <div className="border p-6 rounded-lg">Average CGPA</div>
      </div>
    </DashboardLayout>
  );
}
