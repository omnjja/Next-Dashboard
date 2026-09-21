"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { GrowthDatum } from "@/features/dashboard/utils/dashboardStats";
import { CHART_COLORS } from "@/features/dashboard/utils/chartColors";

type UsersOverTimeChartProps = {
  data: GrowthDatum[];
};

export function UsersOverTimeChart({ data }: UsersOverTimeChartProps) {
  return (
    <div className="rounded-lg border border-light-border bg-light-card p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-text-primary">
        Users Created Over Time
      </h3>
      <p className="text-xs text-text-muted">Cumulative signups by month</p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
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
              contentStyle={{
                fontSize: 12,
                borderRadius: 8,
                borderColor: "#E2E8F0",
              }}
            />
            <Line
              type="monotone"
              dataKey="totalUsers"
              name="Total users"
              stroke={CHART_COLORS[0]}
              strokeWidth={2}
              dot={{ r: 3, fill: CHART_COLORS[0] }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
