"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

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

      <div className="flex flex-col items-center  min-w-0 flex-1">
        <h1 className="truncate text-lg font-semibold text-text-primary capitalize">
          welcome to next dashboard
        </h1>
        <p className="hidden truncate text-sm text-text-muted sm:block capitalize">
          manage your projects and tasks efficiently with our intuitive dashboard.
        </p>
      </div>

    </header>
  );
}
