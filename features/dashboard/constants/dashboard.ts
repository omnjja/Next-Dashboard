import type { DashboardUser } from "../types";
import { BarChart3, Users } from "lucide-react";

export const ALL_FILTER_VALUE = "all";

export const ROLE_OPTIONS: DashboardUser["role"][] = [
  "Admin",
  "Manager",
  "Analyst",
  "Support",
  "Developer",
];

export const STATUS_OPTIONS: DashboardUser["status"][] = ["Active", "Inactive"];

export const COUNTRY_OPTIONS: DashboardUser["country"][] = [
  "Canada",
  "Egypt",
  "Germany",
  "Japan",
  "United Kingdom",
  "United States",
];

export const DASHBOARD_NAV_ITEMS = [
  { label: "Analytics", href: "#analytics", icon: BarChart3 },
  { label: "Users", href: "#users", icon: Users },
] as const;
