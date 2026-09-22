import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FieldValues } from "react-hook-form";
import type { AuthFormFieldProps } from "../types/auth";

export function AuthFormField<TFieldValues extends FieldValues>({
  id,
  label,
  name,
  register,
  type = "text",
  autoComplete,
  placeholder,
  error,
}: AuthFormFieldProps<TFieldValues>) {
  const descriptionId = error ? `${id}-error` : undefined;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-text-muted">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        {...register(name)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={descriptionId}
        className="focus-visible:ring-brand-primary"
      />
      {error && (
        <p id={descriptionId} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
