"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchDashboardUsers } from "@/features/dashboard/dashboardSlice";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { StatsCards } from "@/features/dashboard/components/StatsCards";
import { DashboardCharts } from "@/features/dashboard/components/DashboardCharts";
import { UsersTable } from "@/features/dashboard/components/UsersTable";
import {
  DashboardEmptyState,
  DashboardErrorState,
  DashboardLoadingState,
} from "@/features/dashboard/components/DashboardStates";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { users, isLoading, error } = useAppSelector(
    (state) => state.dashboard,
  );
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDashboardUsers());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-light-base">
      <DashboardSidebar
        mobileOpen={mobileSidebarOpen}
        onMobileOpenChange={setMobileSidebarOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6">
          {isLoading ? (
            <DashboardLoadingState />
          ) : error ? (
            <DashboardErrorState message={error} />
          ) : users.length === 0 ? (
            <DashboardEmptyState />
          ) : (
            <div className="space-y-6">
              <section id="analytics" className="scroll-mt-20 space-y-6">
                <StatsCards users={users} />
                <DashboardCharts users={users} />
              </section>

              <section id="users" className="scroll-mt-20">
                <UsersTable users={users} />
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
