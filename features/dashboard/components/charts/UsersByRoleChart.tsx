"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RoleDatum } from "@/features/dashboard/types";
import { CHART_COLORS } from "@/features/dashboard/utils/chartColors";

type UsersByRoleChartProps = {
  data: RoleDatum[];
};

export function UsersByRoleChart({ data }: UsersByRoleChartProps) {
  return (
    <div className="rounded-lg border border-light-border bg-light-card p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-text-primary">Users by Role</h3>
      <p className="text-xs text-text-muted">Headcount per role</p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              vertical={false}
            />
            <XAxis
              dataKey="role"
              tick={{ fontSize: 12, fill: "#475569" }}
              axisLine={{ stroke: "#E2E8F0" }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#475569" }}
              axisLine={false}
              tickLine={false}
              width={28}
            />
            <Tooltip
              cursor={{ fill: "#F1F5F9" }}
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                borderColor: "#E2E8F0",
              }}
            />
            <Bar
              dataKey="count"
              radius={[4, 4, 0, 0]}
              fill={CHART_COLORS[0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
