import { configureStore } from "@reduxjs/toolkit";

import { boardSlice } from "./board/BoardSlice";

const store = configureStore({
  reducer: {
    [boardSlice.name]: boardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
