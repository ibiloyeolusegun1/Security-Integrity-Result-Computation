"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AuditLog } from "@/types/audit";
import { getAuditLogs } from "@/services/auditService";
import ActionBadge from "@/components/audit/ActionBadge";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    try {
      const data = await getAuditLogs();

      setLogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase()) ||
      log.fullname.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Audit Logs</h1>

        <button onClick={fetchLogs} className="border px-4 py-2 rounded">
          Refresh
        </button>
      </div>

      <input
        type="text"
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-6"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Total Logs</p>

          <h2 className="text-2xl font-bold">{logs.length}</h2>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Result Computed</p>

          <h2 className="text-2xl font-bold">
            {logs.filter((l) => l.action === "RESULT_COMPUTED").length}
          </h2>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Result Updated</p>

          <h2 className="text-2xl font-bold">
            {logs.filter((l) => l.action === "RESULT_UPDATED").length}
          </h2>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-gray-500">Promotions</p>

          <h2 className="text-2xl font-bold">
            {logs.filter((l) => l.action === "STUDENT_PROMOTED").length}
          </h2>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : filteredLogs.length === 0 ? (
        <div className="border rounded-lg p-10 text-center">
          No Audit Logs Found
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Action</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b">
                  <td className="p-4">{log.fullname}</td>
                  <td className="p-4">
                    <ActionBadge action={log.action} />
                  </td>
                  <td className="p-4">{log.description}</td>
                  <td className="p-4">
                    {new Date(log.created_at).toLocaleString()}
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
