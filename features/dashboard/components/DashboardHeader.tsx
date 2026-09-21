"use client";

import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DashboardHeaderProps = {
  onOpenMobileSidebar: () => void;
};

export function DashboardHeader({ onOpenMobileSidebar }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-light-border bg-light-card px-4 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenMobileSidebar}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold text-text-primary">
          Dashboard
        </h1>
        <p className="hidden truncate text-sm text-text-muted sm:block">
          Overview of users and platform activity
        </p>
      </div>

      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell className="h-5 w-5 text-text-muted" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-xs font-semibold text-brand-primary"
          >
            SC
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled className="text-text-muted">
            sarah.chen@company.com
          </DropdownMenuItem>
          <DropdownMenuItem>Profile settings</DropdownMenuItem>
          <DropdownMenuItem className="text-btn-danger">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
