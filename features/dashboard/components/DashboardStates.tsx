import { AlertTriangle, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoadingState() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-light-border bg-light-card p-4 shadow-sm"
          >
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-7 w-16" />
            <Skeleton className="mt-3 h-3 w-32" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-light-border bg-light-card p-4 shadow-sm"
          >
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-1 h-3 w-40" />
            <Skeleton className="mt-4 h-64 w-full" />
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-light-border bg-light-card p-4 shadow-sm">
        <Skeleton className="h-4 w-28" />
        <div className="mt-4 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-light-border bg-light-card px-6 py-16 text-center shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-btn-danger">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-text-primary">
        Couldn&apos;t load dashboard data
      </h3>
      <p className="mt-1 max-w-sm text-sm text-text-muted">{message}</p>
    </div>
  );
}

export function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-light-border bg-light-card px-6 py-16 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-subtle text-brand-primary">
        <Users className="h-5 w-5" />
      </div>
      <h3 className="mt-3 text-sm font-semibold text-text-primary">
        No users yet
      </h3>
      <p className="mt-1 max-w-sm text-sm text-text-muted">
        Once users are added, their stats and activity will show up here.
      </p>
    </div>
  );
}

export function TableEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-sm font-medium text-text-primary">No matching users</p>
      <p className="mt-1 text-sm text-text-muted">
        Try adjusting your search or filters.
      </p>
    </div>
  );
}
