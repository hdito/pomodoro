import timerReducer from "@/features/store/timerSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({ reducer: timerReducer });

export type rootState = ReturnType<typeof store.getState>;
