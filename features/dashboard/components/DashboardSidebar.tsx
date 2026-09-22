"use client";

import { BarChart3, LogOut, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Analytics", href: "#analytics", icon: BarChart3 },
  { label: "Users", href: "#users", icon: Users },
];

// Replace with the real signed-in user once auth wiring is connected here.
const CURRENT_USER = {
  name: "Sarah Chen",
  email: "sarah.chen@company.com",
  initials: "SC",
};

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full min-h-0 flex-col bg-light-card">
      <div className="flex h-16 shrink-0 items-center border-b border-light-border px-5">
        <span className="text-base font-semibold tracking-tight text-text-primary">
          Next Dashboard
        </span>
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-subtle text-brand-primary"
                  : "text-text-muted hover:bg-light-base hover:text-text-primary",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-light-border p-3">
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-subtle text-xs font-semibold text-brand-primary">
            {CURRENT_USER.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-text-primary">
              {CURRENT_USER.name}
            </p>
            <p className="truncate text-xs text-text-muted">
              {CURRENT_USER.email}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            // Hook this up to the existing auth/logout logic.
          }}
          className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-light-base hover:text-btn-danger"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );
}

type DashboardSidebarProps = {
  mobileOpen: boolean;
  onMobileOpenChange: (open: boolean) => void;
};

export function DashboardSidebar({
  mobileOpen,
  onMobileOpenChange,
}: DashboardSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-light-border lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
        <SheetContent side="left" className="h-full w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
