"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppForm } from "@/hooks/useAppForm";
import { AUTH_PATHS } from "../constants/auth";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { login } from "../services/authService";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { AuthFormField } from "./AuthFormField";
import { AuthLayout } from "./AuthLayout";

export default function LoginForm() {
  const { register, handleSubmit, formState, setError } = useAppForm({
    schema: loginSchema,
    defaultValues: { email: "", password: "" },
  });
  const { errors, isSubmitting } = formState;
  const { submit } = useAuthSubmit({
    successRoute: AUTH_PATHS.dashboard,
    defaultErrorMessage: "Unable to log in.",
  });

  function onSubmit(data: LoginFormData) {
    submit(
      data,
      (formData) => login(formData.email, formData.password),
      setError,
    );
  }

  return (
    <AuthLayout
      title="Log in"
      description="Welcome back. Enter your details to continue."
      footer={
        <p className="mt-6 text-center text-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href={AUTH_PATHS.signup}
            className="font-medium text-brand-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {errors.root && (
          <p className="text-sm text-red-600">{errors.root.message}</p>
        )}

        <AuthFormField
          id="email"
          label="Email"
          name="email"
          register={register}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
        />

        <AuthFormField
          id="password"
          label="Password"
          name="password"
          register={register}
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-primary text-white hover:bg-slate-800 cursor-pointer"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
