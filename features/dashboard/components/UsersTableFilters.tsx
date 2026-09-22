"use client";

import { ChevronDown, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ExportFormat } from "../utils/exportUsersData";

type UsersTableFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  roleFilter: string;
  onRoleFilterChange: (value: string | null) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string | null) => void;
  countryFilter: string;
  onCountryFilterChange: (value: string | null) => void;
  allFilterValue: string;
  roleOptions: readonly string[];
  statusOptions: readonly string[];
  countryOptions: readonly string[];
  displayedCount: number;
  totalCount: number;
  onExport: (format: ExportFormat) => void;
};

export function UsersTableFilters({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  countryFilter,
  onCountryFilterChange,
  allFilterValue,
  roleOptions,
  statusOptions,
  countryOptions,
  displayedCount,
  totalCount,
  onExport,
}: UsersTableFiltersProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-light-border p-4 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or email"
          className="pl-8"
        />
      </div>

      <Select value={roleFilter} onValueChange={onRoleFilterChange}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={allFilterValue}>All roles</SelectItem>
          {roleOptions.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={allFilterValue}>All statuses</SelectItem>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={countryFilter} onValueChange={onCountryFilterChange}>
        <SelectTrigger className="w-full sm:w-[170px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={allFilterValue}>All countries</SelectItem>
          {countryOptions.map((country) => (
            <SelectItem key={country} value={country}>
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-3 sm:ml-auto">
        <p className="text-xs text-text-muted">
          {displayedCount} of {totalCount} users
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={displayedCount === 0}
            >
              <Download className="h-4 w-4" />
              Export
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onExport("csv")}>
              CSV (.csv)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("xlsx")}>
              Excel (.xlsx)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("pdf")}>
              PDF (.pdf)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
