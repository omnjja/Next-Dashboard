"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAppForm } from "@/hooks/useAppForm";
import { AUTH_PATHS } from "../constants/auth";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { signup } from "../services/authService";
import { signupSchema, type SignupFormData } from "../schemas/signupSchema";
import { AuthFormField } from "./AuthFormField";
import { AuthLayout } from "./AuthLayout";

export default function SignupForm() {
  const { register, handleSubmit, formState, setError } = useAppForm({
    schema: signupSchema,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { errors, isSubmitting } = formState;
  const { submit } = useAuthSubmit({
    successRoute: AUTH_PATHS.dashboard,
    defaultErrorMessage: "Unable to create account.",
  });

  function onSubmit(data: SignupFormData) {
    submit(
      data,
      (formData) =>
        signup(formData.name, formData.email, formData.password),
      setError,
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      description="It only takes a minute to get started."
      footer={
        <p className="mt-6 text-center text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            href={AUTH_PATHS.login}
            className="font-medium text-brand-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {errors.root && (
          <p className="text-sm text-red-600">{errors.root.message}</p>
        )}

        <AuthFormField
          id="signup-name"
          label="Name"
          name="name"
          register={register}
          autoComplete="name"
          placeholder="Your name"
          error={errors.name?.message}
        />

        <AuthFormField
          id="signup-email"
          label="Email"
          name="email"
          register={register}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
        />

        <AuthFormField
          id="signup-password"
          label="Password"
          name="password"
          register={register}
          type="password"
          autoComplete="new-password"
          placeholder="At least 6 characters"
          error={errors.password?.message}
        />

        <AuthFormField
          id="confirm-password"
          label="Confirm password"
          name="confirmPassword"
          register={register}
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-primary text-white hover:bg-slate-800 cursor-pointer"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
