import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

export const themeSlice = createSlice({
  name: "theme",
  initialState: "",
  reducers: {
    changeTheme: (_, action) => {
      return action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export const selectTheme = (rootState: RootState) => rootState.theme;
