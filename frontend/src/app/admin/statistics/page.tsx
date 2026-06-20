"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/cards/StatsCard";
import { DashboardStats } from "@/types/statistics";
import { getDashboardStats } from "@/services/statisticsService";

export default function StatisticsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const loadStats = async () => {
    const data = await getDashboardStats();

    setStats(data);
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard title="Students" value={stats?.students || 0} />
        <StatsCard title="Courses" value={stats?.courses || 0} />
        <StatsCard title="Results" value={stats?.results || 0} />
        <StatsCard title="Average CGPA" value={stats?.average_cgpa || 0} />
      </div>
    </DashboardLayout>
  );
}
