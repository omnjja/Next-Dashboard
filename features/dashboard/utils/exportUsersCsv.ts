import type { DashboardUser } from "../types";
import { EXPORT_HEADERS, toExportRows } from "./exportUsersData";

/**
 * Escapes a single CSV field per RFC 4180:
 * - wraps the value in quotes if it contains a comma, quote, or newline
 * - doubles any internal quotes
 * - normalizes null/undefined to an empty string
 */
function escapeCsvField(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);
  const needsQuoting = /[",\n\r]/.test(stringValue);

  if (!needsQuoting) {
    return stringValue;
  }

  return `"${stringValue.replace(/"/g, '""')}"`;
}

/**
 * Builds a CSV string (header + rows) from the given users.
 */
export function usersToCsv(users: DashboardUser[]): string {
  const headerRow = EXPORT_HEADERS.join(",");
  const rows = toExportRows(users).map((row) =>
    row.map(escapeCsvField).join(","),
  );

  return [headerRow, ...rows].join("\r\n");
}

/**
 * Serializes the given users to CSV and triggers a client-side browser
 * download. Uses only native Blob/URL APIs.
 */
export function downloadUsersCsv(
  users: DashboardUser[],
  filename = "users.csv",
): void {
  const csvContent = usersToCsv(users);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
