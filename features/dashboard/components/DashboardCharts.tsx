"use client";

import { useMemo } from "react";
import {
  computeUsersByCountry,
  computeUsersByRole,
  computeUsersByStatus,
  computeUsersOverTime,
} from "@/features/dashboard/utils/dashboardStats";
import { UsersByRoleChart } from "@/features/dashboard/components/charts/UsersByRoleChart";
import { UsersByStatusChart } from "@/features/dashboard/components/charts/UsersByStatusChart";
import { UsersOverTimeChart } from "@/features/dashboard/components/charts/UsersOverTimeChart";
import { UsersByCountryChart } from "@/features/dashboard/components/charts/UsersByCountryChart";
import type { DashboardUser } from "../types";

type DashboardChartsProps = {
  users: DashboardUser[];
};

export function DashboardCharts({ users }: DashboardChartsProps) {
  const roleData = useMemo(() => computeUsersByRole(users), [users]);
  const statusData = useMemo(() => computeUsersByStatus(users), [users]);
  const growthData = useMemo(() => computeUsersOverTime(users), [users]);
  const countryData = useMemo(() => computeUsersByCountry(users), [users]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <UsersByRoleChart data={roleData} />
      <UsersByStatusChart data={statusData} />
      <UsersOverTimeChart data={growthData} />
      <UsersByCountryChart data={countryData} />
    </div>
  );
}
