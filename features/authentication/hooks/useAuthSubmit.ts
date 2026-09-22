import { useRouter } from "next/navigation";
import type { FieldValues, UseFormSetError } from "react-hook-form";

import { AUTH_PATHS } from "../constants/auth";
import { login } from "../authSlice";
import type { AuthenticatedUser, AuthSubmitOptions } from "../types/auth";
import { useAppDispatch } from "@/store/hooks";



export function useAuthSubmit({
  successRoute = AUTH_PATHS.dashboard,
  defaultErrorMessage = "Unable to continue.",
}: AuthSubmitOptions = {}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const submit = <TFieldValues extends FieldValues>(
    data: TFieldValues,
    action: (data: TFieldValues) => AuthenticatedUser,
    setError: UseFormSetError<TFieldValues>,
  ) => {
    try {
      const user = action(data);
      dispatch(login(user));
      router.replace(successRoute);
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : defaultErrorMessage,
      });
    }
  };

  return { submit };
}
