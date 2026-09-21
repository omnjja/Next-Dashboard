// Shared palette so all charts read as one visual language.
// Anchored on the app's brand-primary blue, with supporting hues only where
// a chart needs more than one or two series.
export const CHART_COLORS = [
  "#023e8a", // brand-primary
  "#0ea5e9", // sky-500 (supporting)
  "#059669", // btn-confirm
  "#d97706", // badge-warning
  "#7c3aed", // violet-600 (supporting)
  "#e11d48", // btn-danger
];

export const STATUS_COLORS: Record<"Active" | "Inactive", string> = {
  Active: "#059669",
  Inactive: "#94a3b8",
};
