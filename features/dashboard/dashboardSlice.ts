import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { DashboardState, DashboardUser } from "@/features/dashboard/types";
import { getDashboardUsers } from "@/features/dashboard/services/dashboardService";

const initialState: DashboardState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchDashboardUsers = createAsyncThunk<
  DashboardUser[],
  void,
  { rejectValue: string }
>("dashboard/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    return getDashboardUsers();
  } catch {
    return rejectWithValue("Unable to load dashboard users.");
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<DashboardUser[]>) {
      state.users = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDashboardUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ??
          action.error.message ??
          "Unable to load dashboard users.";
      });
  },
});

export const { setUsers, setLoading, setError, clearError } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
