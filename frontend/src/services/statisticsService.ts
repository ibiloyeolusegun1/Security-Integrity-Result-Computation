import API from "./api";
import { DashboardStats } from "@/types/statistics";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await API.get("/results/dashboard/stats");

  return response.data.stats;
};
