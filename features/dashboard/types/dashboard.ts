export type DashboardUser = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Analyst" | "Support" | "Developer";
  status: "Active" | "Inactive";
  country:
    | "Canada"
    | "Egypt"
    | "Germany"
    | "Japan"
    | "United Kingdom"
    | "United States";
  age: number;
  createdAt: string;
};

export type DashboardState = {
  users: DashboardUser[];
  isLoading: boolean;
  error: string | null;
};

export type SortKey = "name" | "age" | "createdAt";
export type SortDirection = "asc" | "desc";

export type DashboardStats = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  averageAge: number;
};

export type RoleDatum = { role: DashboardUser["role"]; count: number };
export type StatusDatum = { status: DashboardUser["status"]; count: number };
export type CountryDatum = { country: DashboardUser["country"]; count: number };
export type GrowthDatum = {
  month: string;
  newUsers: number;
  totalUsers: number;
};
