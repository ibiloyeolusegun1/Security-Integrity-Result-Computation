"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/cards/StatsCard";
import { DashboardStats } from "@/types/statistics";
import { getDashboardStats } from "@/services/statisticsService";
import StatisticsChart from "@/components/charts/StatisticsChart";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500">
          Security & Integrity of Result Computation System
        </p>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatsCard title="Students" value={stats?.students || 0} />
          <StatsCard title="Courses" value={stats?.courses || 0} />
          <StatsCard title="Results" value={stats?.results || 0} />
          <StatsCard title="Average CGPA" value={stats?.average_cgpa || 0} />
        </div>
      )}
      <StatisticsChart
        students={stats?.students || 0}
        courses={stats?.courses || 0}
        results={stats?.results || 0}
      />
    </DashboardLayout>
  );
}
