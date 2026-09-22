import type { DashboardUser } from "../types";

export type ExportFormat = "xlsx" | "pdf";

export const EXPORT_HEADERS = [
  "Name",
  "Email",
  "Role",
  "Status",
  "Country",
  "Age",
  "Created At",
] as const;

export type ExportRow = [
  name: string,
  email: string,
  role: string,
  status: string,
  country: string,
  age: number,
  createdAt: string,
];

function formatCreatedAt(createdAt: string): string {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  // YYYY-MM-DD, safe for spreadsheet re-import regardless of locale
  return date.toISOString().slice(0, 10);
}

/**
 * Shapes users into the shared 7-field row structure used by every export
 * format (CSV, XLSX, PDF). `id` is intentionally excluded since it is not
 * shown in the table.
 */
export function toExportRows(users: DashboardUser[]): ExportRow[] {
  return users.map((user) => [
    user.name,
    user.email,
    user.role,
    user.status,
    user.country,
    user.age,
    formatCreatedAt(user.createdAt),
  ]);
}
