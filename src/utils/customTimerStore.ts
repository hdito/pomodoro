import { MS_IN_MINUTE } from "./constants";
import timerReducer from "@/features/store/timerSlice";
import { customTimerState } from "@/types/customTimerState";
import { configureStore } from "@reduxjs/toolkit";

export const getCustomTimerStore = ({
  isPause = true,
  mode = "focus",
  focusTime = 25,
  breakTime = 5,
  longBreakTime = 15,
  remainingTime = 25 * MS_IN_MINUTE,
  isAutostart = false,
  currentCycle = 1,
  cyclesTillLongBreak = 3,
}: customTimerState) =>
  configureStore({
    reducer: timerReducer,
    preloadedState: {
      isPause,
      mode,
      focusTime,
      breakTime,
      longBreakTime,
      remainingTime,
      isAutostart,
      currentCycle,
      cyclesTillLongBreak,
    },
  });

export const getCustomTimerState = ({
  isPause = true,
  mode = "focus",
  focusTime = 25,
  breakTime = 5,
  longBreakTime = 15,
  remainingTime = 25 * MS_IN_MINUTE,
  isAutostart = false,
  currentCycle = 1,
  cyclesTillLongBreak = 3,
}: customTimerState) => {
  return {
    isPause,
    mode,
    focusTime,
    breakTime,
    longBreakTime,
    remainingTime,
    isAutostart,
    currentCycle,
    cyclesTillLongBreak,
  };
};
