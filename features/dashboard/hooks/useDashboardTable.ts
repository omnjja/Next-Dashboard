import { useMemo, useState } from "react";
import {
  ALL_FILTER_VALUE,
  COUNTRY_OPTIONS,
  ROLE_OPTIONS,
  STATUS_OPTIONS,
} from "../constants/dashboard";
import type { DashboardUser, SortDirection, SortKey } from "../types";

export function useDashboardTable(users: DashboardUser[]) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>(ALL_FILTER_VALUE);
  const [statusFilter, setStatusFilter] = useState<string>(ALL_FILTER_VALUE);
  const [countryFilter, setCountryFilter] = useState<string>(ALL_FILTER_VALUE);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const displayedUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole =
        roleFilter === ALL_FILTER_VALUE || user.role === roleFilter;
      const matchesStatus =
        statusFilter === ALL_FILTER_VALUE || user.status === statusFilter;
      const matchesCountry =
        countryFilter === ALL_FILTER_VALUE || user.country === countryFilter;

      return matchesSearch && matchesRole && matchesStatus && matchesCountry;
    });

    return [...filtered].sort((a, b) => {
      let comparison = 0;

      if (sortKey === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortKey === "age") {
        comparison = a.age - b.age;
      } else {
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
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
      setSortDirection((previous) => (previous === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  return {
    displayedUsers,
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    countryFilter,
    setCountryFilter,
    sortKey,
    sortDirection,
    toggleSort,
    allFilterValue: ALL_FILTER_VALUE,
    roleOptions: ROLE_OPTIONS,
    statusOptions: STATUS_OPTIONS,
    countryOptions: COUNTRY_OPTIONS,
  };
}
