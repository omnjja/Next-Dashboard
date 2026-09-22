"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { StatusDatum } from "@/features/dashboard/types";
import { STATUS_COLORS } from "@/features/dashboard/utils/chartColors";

type UsersByStatusChartProps = {
  data: StatusDatum[];
};

export function UsersByStatusChart({ data }: UsersByStatusChartProps) {
  return (
    <div className="rounded-lg border border-light-border bg-light-card p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-text-primary">
        Users by Status
      </h3>
      <p className="text-xs text-text-muted">Active vs. inactive accounts</p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.status} fill={STATUS_COLORS[entry.status]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                borderColor: "#E2E8F0",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={28}
              iconType="circle"
              wrapperStyle={{ fontSize: 12, color: "#475569" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
