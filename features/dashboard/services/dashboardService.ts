import { mockDashboardUsers } from "../data/mockDashboardData";
import type { DashboardUser } from "../types";

export function getDashboardUsers(): DashboardUser[] {
  return mockDashboardUsers;
}
