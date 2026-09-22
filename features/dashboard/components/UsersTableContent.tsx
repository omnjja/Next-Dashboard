"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableEmptyState } from "@/features/dashboard/components/DashboardStates";
import type { DashboardUser, SortDirection, SortKey } from "../types";
import { cn } from "@/lib/utils";

type SortableHeadProps = {
  column: SortKey;
  label: string;
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
};

function SortableHead({
  column,
  label,
  sortKey,
  sortDirection,
  onSort,
}: SortableHeadProps) {
  const isActive = column === sortKey;

  return (
    <TableHead>
      <button
        type="button"
        onClick={() => onSort(column)}
        className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-text-muted hover:text-text-primary"
      >
        {label}
        {!isActive ? (
          <ArrowUpDown className="h-3.5 w-3.5 text-text-muted" />
        ) : sortDirection === "asc" ? (
          <ArrowUp className="h-3.5 w-3.5 text-brand-primary" />
        ) : (
          <ArrowDown className="h-3.5 w-3.5 text-brand-primary" />
        )}
      </button>
    </TableHead>
  );
}

type UsersTableContentProps = {
  users: DashboardUser[];
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
};

export function UsersTableContent({
  users,
  sortKey,
  sortDirection,
  onSort,
}: UsersTableContentProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHead
              column="name"
              label="Name"
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Email
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Role
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Status
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Country
            </TableHead>
            <SortableHead
              column="age"
              label="Age"
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableHead
              column="createdAt"
              label="Created At"
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={onSort}
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="whitespace-nowrap font-medium text-text-primary">
                {user.name}
              </TableCell>
              <TableCell className="whitespace-nowrap text-text-muted">
                {user.email}
              </TableCell>
              <TableCell className="whitespace-nowrap text-text-muted">
                {user.role}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Badge
                  variant="outline"
                  className={cn(
                    "border-transparent font-medium",
                    user.status === "Active"
                      ? "bg-emerald-50 text-btn-confirm"
                      : "bg-slate-100 text-text-muted",
                  )}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap text-text-muted">
                {user.country}
              </TableCell>
              <TableCell className="whitespace-nowrap text-text-muted">
                {user.age}
              </TableCell>
              <TableCell className="whitespace-nowrap text-text-muted">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.length === 0 && <TableEmptyState />}
    </div>
  );
}
