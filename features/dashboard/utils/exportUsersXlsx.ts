import * as XLSX from "xlsx";
import type { DashboardUser } from "../types";
import { EXPORT_HEADERS, toExportRows } from "./exportUsersData";

/**
 * Serializes the given users to an .xlsx workbook and triggers a
 * client-side browser download.
 */
export function downloadUsersXlsx(
  users: DashboardUser[],
  filename = "users.xlsx",
): void {
  const worksheetData: (string | number)[][] = [
    Array.from(EXPORT_HEADERS),
    ...toExportRows(users),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  XLSX.writeFile(workbook, filename);
}
