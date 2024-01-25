import { configureStore } from "@reduxjs/toolkit";

import { boardSlice } from "./board/BoardSlice";
import { themeSlice } from "./theme/ThemeSlice";

const store = configureStore({
  reducer: {
    [boardSlice.name]: boardSlice.reducer,
    [themeSlice.name]: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
