import { DashboardUser } from "../data/mockDashboardData";


export type DashboardStats = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  averageAge: number;
};

export function computeDashboardStats(users: DashboardUser[]): DashboardStats {
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const inactiveUsers = totalUsers - activeUsers;
  const averageAge = totalUsers
    ? Math.round((users.reduce((sum, u) => sum + u.age, 0) / totalUsers) * 10) /
      10
    : 0;

  return { totalUsers, activeUsers, inactiveUsers, averageAge };
}

export type RoleDatum = { role: DashboardUser["role"]; count: number };

export function computeUsersByRole(users: DashboardUser[]): RoleDatum[] {
  const order: DashboardUser["role"][] = [
    "Admin",
    "Manager",
    "Analyst",
    "Support",
    "Developer",
  ];
  const counts = new Map<DashboardUser["role"], number>();
  for (const u of users) counts.set(u.role, (counts.get(u.role) ?? 0) + 1);

  return order
    .filter((role) => counts.has(role))
    .map((role) => ({ role, count: counts.get(role) ?? 0 }));
}

export type StatusDatum = { status: DashboardUser["status"]; count: number };

export function computeUsersByStatus(users: DashboardUser[]): StatusDatum[] {
  const active = users.filter((u) => u.status === "Active").length;
  const inactive = users.length - active;
  return [
    { status: "Active", count: active },
    { status: "Inactive", count: inactive },
  ];
}

export type CountryDatum = { country: DashboardUser["country"]; count: number };

export function computeUsersByCountry(users: DashboardUser[]): CountryDatum[] {
  const counts = new Map<DashboardUser["country"], number>();
  for (const u of users)
    counts.set(u.country, (counts.get(u.country) ?? 0) + 1);

  return Array.from(counts.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);
}

export type GrowthDatum = {
  month: string;
  newUsers: number;
  totalUsers: number;
};

export function computeUsersOverTime(users: DashboardUser[]): GrowthDatum[] {
  const monthKey = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };
  const monthLabel = (key: string) => {
    const [year, month] = key.split("-").map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
  };

  const counts = new Map<string, number>();
  for (const u of users) {
    const key = monthKey(u.createdAt);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  const sortedKeys = Array.from(counts.keys()).sort();

  let running = 0;
  return sortedKeys.map((key) => {
    const newUsers = counts.get(key) ?? 0;
    running += newUsers;
    return { month: monthLabel(key), newUsers, totalUsers: running };
  });
}
