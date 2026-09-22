"use client";

import { useDashboardTable } from "../hooks/useDashboardTable";
import type { DashboardUser } from "../types";
import type { ExportFormat } from "../utils/exportUsersData";
import { downloadUsersPdf } from "../utils/exportUsersPdf";
import { downloadUsersXlsx } from "../utils/exportUsersXlsx";
import { UsersTableContent } from "./UsersTableContent";
import { UsersTableFilters } from "./UsersTableFilters";

type UsersTableProps = {
  users: DashboardUser[];
};

const EXPORT_HANDLERS: Record<ExportFormat, (users: DashboardUser[]) => void> = {
  xlsx: downloadUsersXlsx,
  pdf: downloadUsersPdf,
};

export function UsersTable({ users }: UsersTableProps) {
  const table = useDashboardTable(users);

  function handleExport(format: ExportFormat) {
    EXPORT_HANDLERS[format](table.displayedUsers);
  }

  return (
    <div className="rounded-lg border border-light-border bg-light-card shadow-sm">
      <UsersTableFilters
        search={table.search}
        onSearchChange={table.setSearch}
        roleFilter={table.roleFilter}
        onRoleFilterChange={(value) =>
          table.setRoleFilter(value ?? table.allFilterValue)
        }
        statusFilter={table.statusFilter}
        onStatusFilterChange={(value) =>
          table.setStatusFilter(value ?? table.allFilterValue)
        }
        countryFilter={table.countryFilter}
        onCountryFilterChange={(value) =>
          table.setCountryFilter(value ?? table.allFilterValue)
        }
        allFilterValue={table.allFilterValue}
        roleOptions={table.roleOptions}
        statusOptions={table.statusOptions}
        countryOptions={table.countryOptions}
        displayedCount={table.displayedUsers.length}
        totalCount={users.length}
        onExport={handleExport}
      />
      <UsersTableContent
        users={table.displayedUsers}
        sortKey={table.sortKey}
        sortDirection={table.sortDirection}
        onSort={table.toggleSort}
      />
    </div>
  );
}