import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAuthenticatedUser } from "./services/authService";
import type { AuthState, AuthenticatedUser } from "./types/auth";

const initialState: AuthState = (() => {
  const user = getAuthenticatedUser();

  return {
    user,
    isAuthenticated: !!user,
  };
})();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthenticatedUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
