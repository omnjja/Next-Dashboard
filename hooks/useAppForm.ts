import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FieldValues,
  type Resolver,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import { z } from "zod";

type UseAppFormOptions<TFieldValues extends FieldValues> = Omit<
  UseFormProps<TFieldValues>,
  "resolver"
> & {
  schema: z.ZodType<TFieldValues, TFieldValues>;
};

export function useAppForm<TFieldValues extends FieldValues>(
  options: UseAppFormOptions<TFieldValues>,
): UseFormReturn<TFieldValues> {
  const { schema, ...formOptions } = options;

  return useForm<TFieldValues>({
    ...formOptions,
    resolver: zodResolver(schema) as Resolver<TFieldValues>,
  });
}
