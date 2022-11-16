import { configureStore, type Reducer } from "@reduxjs/toolkit";
import type { rootState } from "../features/store/store";

export const getStore = (reducer: Reducer) => configureStore({ reducer });

export const getCustomStore = (reducer: Reducer, preloadedState: rootState) => {
  return configureStore({ reducer, preloadedState });
};
