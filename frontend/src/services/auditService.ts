import API from "./api";
import { AuditLog } from "@/types/audit";

export const getAuditLogs = async (): Promise<AuditLog[]> => {
  const response = await API.get("/audit");

  return response.data.data;
};
