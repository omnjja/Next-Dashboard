"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableEmptyState } from "@/features/dashboard/components/DashboardStates";
import { cn } from "@/lib/utils";
import { DashboardUser } from "../data/mockDashboardData";

type UsersTableProps = {
  users: DashboardUser[];
};

type SortKey = "name" | "age" | "createdAt";
type SortDirection = "asc" | "desc";

const ROLE_OPTIONS: DashboardUser["role"][] = [
  "Admin",
  "Manager",
  "Analyst",
  "Support",
  "Developer",
];

const STATUS_OPTIONS: DashboardUser["status"][] = ["Active", "Inactive"];

const COUNTRY_OPTIONS: DashboardUser["country"][] = [
  "Canada",
  "Egypt",
  "Germany",
  "Japan",
  "United Kingdom",
  "United States",
];

const ALL = "all";

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

export function UsersTable({ users }: UsersTableProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>(ALL);
  const [statusFilter, setStatusFilter] = useState<string>(ALL);
  const [countryFilter, setCountryFilter] = useState<string>(ALL);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const displayedUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesRole = roleFilter === ALL || user.role === roleFilter;

      const matchesStatus =
        statusFilter === ALL || user.status === statusFilter;

      const matchesCountry =
        countryFilter === ALL || user.country === countryFilter;

      return matchesSearch && matchesRole && matchesStatus && matchesCountry;
    });

    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortKey === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortKey === "age") {
        comparison = a.age - b.age;
      } else {
        comparison =
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime();
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
    countryFilter,
    sortKey,
    sortDirection,
  ]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  return (
    <div className="rounded-lg border border-light-border bg-light-card shadow-sm">
      <div className="flex flex-col gap-3 border-b border-light-border p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
            className="pl-8"
          />
        </div>

        <Select
          value={roleFilter}
          onValueChange={(value) => setRoleFilter(value ?? ALL)}
        >
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Role" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={ALL}>All roles</SelectItem>

            {ROLE_OPTIONS.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value ?? ALL)}
        >
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>

            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={countryFilter}
          onValueChange={(value) => setCountryFilter(value ?? ALL)}
        >
          <SelectTrigger className="w-full sm:w-[170px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value={ALL}>All countries</SelectItem>

            {COUNTRY_OPTIONS.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-xs text-text-muted sm:ml-auto">
          {displayedUsers.length} of {users.length} users
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead
                column="name"
                label="Name"
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSort={toggleSort}
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
                onSort={toggleSort}
              />

              <SortableHead
                column="createdAt"
                label="Created At"
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSort={toggleSort}
              />
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayedUsers.map((user) => (
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

        {displayedUsers.length === 0 && <TableEmptyState />}
      </div>
    </div>
  );
}
