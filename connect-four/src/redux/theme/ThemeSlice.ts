import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

const LOCAL_STORAGE_KEY = "vilsivul_connect_four";

export const themeSlice = createSlice({
  name: "theme",
  initialState: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "").theme,
  reducers: {
    changeTheme: (_, action) => {
      return action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export const selectTheme = (rootState: RootState) => rootState.theme;
