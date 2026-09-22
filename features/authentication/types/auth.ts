import type { ReactNode } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type AuthenticatedUser = Omit<MockUser, "password">;

export type AuthState = {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
};

export type AuthFormFieldProps<TFieldValues extends FieldValues> = {
  id: string;
  label: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
};

export type AuthLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
};

export type AuthSubmitOptions = {
  successRoute?: string;
  defaultErrorMessage?: string;
};
