import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthenticatedUser } from "./data/mockUsers";
import { getAuthenticatedUser } from "./services/authService";

type AuthState = {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
};

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
