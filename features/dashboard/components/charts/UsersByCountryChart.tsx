"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { CountryDatum } from "@/features/dashboard/types";
import { CHART_COLORS } from "@/features/dashboard/utils/chartColors";

type UsersByCountryChartProps = {
  data: CountryDatum[];
};

export function UsersByCountryChart({ data }: UsersByCountryChartProps) {
  return (
    <div className="rounded-lg border border-light-border bg-light-card p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-text-primary">
        Users by Country
      </h3>
      <p className="text-xs text-text-muted">
        Distribution by registered country
      </p>
      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="countryFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={CHART_COLORS[1]}
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor={CHART_COLORS[1]}
                  stopOpacity={0.03}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E2E8F0"
              vertical={false}
            />
            <XAxis
              dataKey="country"
              tick={{ fontSize: 11, fill: "#475569" }}
              axisLine={{ stroke: "#E2E8F0" }}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={48}
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
            <Area
              type="monotone"
              dataKey="count"
              stroke={CHART_COLORS[1]}
              strokeWidth={2}
              fill="url(#countryFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
