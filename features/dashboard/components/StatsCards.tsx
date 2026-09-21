"use client";

import { useMemo } from "react";
import { CalendarClock, UserCheck, UserX, Users } from "lucide-react";
import { computeDashboardStats } from "@/features/dashboard/utils/dashboardStats";
import { cn } from "@/lib/utils";
import { DashboardUser } from "../data/mockDashboardData";

type StatsCardsProps = {
  users: DashboardUser[];
};

export function StatsCards({ users }: StatsCardsProps) {
  const stats = useMemo(() => computeDashboardStats(users), [users]);

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      helper: "All registered accounts",
      icon: Users,
      iconClassName: "bg-brand-subtle text-brand-primary",
    },
    {
      label: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      helper: stats.totalUsers
        ? `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}% of total`
        : "No data yet",
      icon: UserCheck,
      iconClassName: "bg-emerald-50 text-btn-confirm",
    },
    {
      label: "Inactive Users",
      value: stats.inactiveUsers.toLocaleString(),
      helper: stats.totalUsers
        ? `${Math.round((stats.inactiveUsers / stats.totalUsers) * 100)}% of total`
        : "No data yet",
      icon: UserX,
      iconClassName: "bg-rose-50 text-btn-danger",
    },
    {
      label: "Average Age",
      value: stats.averageAge ? stats.averageAge.toString() : "—",
      helper: "Across all users",
      icon: CalendarClock,
      iconClassName: "bg-amber-50 text-badge-warning",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, helper, icon: Icon, iconClassName }) => (
        <div
          key={label}
          className="rounded-lg border border-light-border bg-light-card p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-text-muted">{label}</p>
              <p className="mt-1 text-2xl font-semibold text-text-primary">
                {value}
              </p>
            </div>
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-md",
                iconClassName,
              )}
            >
              <Icon className="h-4.5 w-4.5" />
            </div>
          </div>
          <p className="mt-3 text-xs text-text-muted">{helper}</p>
        </div>
      ))}
    </div>
  );
}
