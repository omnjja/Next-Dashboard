import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AuthLayoutProps } from "../types/auth";

export function AuthLayout({
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-light-base px-4">
      <Card className="w-full max-w-md border-light-border bg-light-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-text-primary">
            {title}
          </CardTitle>
          <CardDescription className="text-text-muted">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {children}
          {footer}
        </CardContent>
      </Card>
    </div>
  );
}
