"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppForm } from "@/hooks/useAppForm";
import { login } from "../authSlice";
import { signup } from "../services/authService";
import {
  signupSchema,
  SignupFormData,
} from "../schemas/signupSchema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function SignupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const form = useAppForm({
    schema: signupSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors, isSubmitting } = formState;

  function onSubmit(data: SignupFormData) {
    try {
      const user = signup(data.name, data.email, data.password);
      dispatch(login(user));
      router.push("/");
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Unable to create account.",
      });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-light-base px-4">
      <Card className="w-full max-w-md border-light-border bg-light-card shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-text-primary">
            Create your account
          </CardTitle>
          <CardDescription className="text-text-muted">
            It only takes a minute to get started.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {errors.root && (
              <p className="text-sm text-red-600">{errors.root.message}</p>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="signup-name" className="text-text-muted">
                Name
              </Label>
              <Input
                id="signup-name"
                type="text"
                autoComplete="name"
                {...register("name")}
                placeholder="Your name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "signup-name-error" : undefined}
                className="focus-visible:ring-brand-primary"
              />
              {errors.name && (
                <p id="signup-name-error" className="text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-email" className="text-text-muted">
                Email
              </Label>
              <Input
                id="signup-email"
                type="email"
                autoComplete="email"
                {...register("email")}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "signup-email-error" : undefined
                }
                className="focus-visible:ring-brand-primary"
              />
              {errors.email && (
                <p id="signup-email-error" className="text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="signup-password" className="text-text-muted">
                Password
              </Label>
              <Input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                {...register("password")}
                placeholder="At least 6 characters"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "signup-password-error" : undefined
                }
                className="focus-visible:ring-brand-primary"
              />
              {errors.password && (
                <p id="signup-password-error" className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm-password" className="text-text-muted">
                Confirm password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                {...register("confirmPassword")}
                placeholder="Re-enter your password"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirm-password-error" : undefined
                }
                className="focus-visible:ring-brand-primary"
              />
              {errors.confirmPassword && (
                <p id="confirm-password-error" className="text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-primary text-white hover:bg-slate-800 cursor-pointer"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-brand-primary hover:underline"
            >
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
