import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { DashboardUser } from "../types";
import { EXPORT_HEADERS, toExportRows } from "./exportUsersData";

/**
 * Serializes the given users to a simple tabular PDF and triggers a
 * client-side browser download. Landscape orientation is used to
 * comfortably fit all 7 columns (including email) on the page.
 */
export function downloadUsersPdf(
  users: DashboardUser[],
  filename = "users.pdf",
): void {
  const doc = new jsPDF({ orientation: "landscape" });

  autoTable(doc, {
    head: [Array.from(EXPORT_HEADERS)],
    body: toExportRows(users).map((row) => row.map(String)),
  });

  doc.save(filename);
}
