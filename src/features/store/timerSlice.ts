import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MS_IN_MINUTE, MS_IN_SECOND } from "@/utils/constants";
import { rootState } from "./store";

export type timerState = {
  isPause: boolean;
  mode: "focus" | "break" | "longBreak";
  focusTime: number;
  breakTime: number;
  longBreakTime: number;
  remainingTime: number;
  isAutostart: boolean;
  currentCycle: number;
  cyclesTillLongBreak: number;
};

const initialState: timerState = {
  isPause: true,
  mode: "focus",
  focusTime: 25,
  breakTime: 5,
  longBreakTime: 15,
  remainingTime: 25 * MS_IN_MINUTE,
  isAutostart: false,
  currentCycle: 1,
  cyclesTillLongBreak: 3,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    start: (state) => {
      state.isPause = false;
    },
    pause: (state) => {
      state.isPause = true;
    },
    tick: (state) => {
      state.remainingTime -= MS_IN_SECOND;
      if (state.remainingTime > 0) return;
      switch (state.mode) {
        case "focus":
          state.remainingTime =
            state.currentCycle < state.cyclesTillLongBreak
              ? state.breakTime * MS_IN_MINUTE
              : state.longBreakTime * MS_IN_MINUTE;
          state.mode =
            state.currentCycle < state.cyclesTillLongBreak
              ? "break"
              : "longBreak";
          break;
        case "break":
          state.mode = "focus";
          state.currentCycle++;
          state.remainingTime = state.focusTime * MS_IN_MINUTE;
          break;
        case "longBreak":
          state.mode = "focus";
          state.currentCycle = 1;
          state.remainingTime = state.focusTime * MS_IN_MINUTE;
          break;
      }
      if (!state.isAutostart) state.isPause = true;
    },
    stop: (state) => {
      state.isPause = true;
      switch (state.mode) {
        case "focus":
          state.remainingTime = state.focusTime * MS_IN_MINUTE;
          break;
        case "break":
          state.remainingTime = state.breakTime * MS_IN_MINUTE;
          break;
        case "longBreak":
          state.remainingTime = state.longBreakTime * MS_IN_MINUTE;
          break;
      }
    },
    changeFocusTime: (state, action: PayloadAction<number>) => {
      if (
        state.isPause &&
        state.mode === "focus" &&
        state.remainingTime === state.focusTime * MS_IN_MINUTE
      )
        state.remainingTime = action.payload * MS_IN_MINUTE;
      state.focusTime = action.payload;
    },
    changeBreakTime: (state, action: PayloadAction<number>) => {
      if (
        state.isPause &&
        state.mode === "break" &&
        state.remainingTime === state.breakTime * MS_IN_MINUTE
      )
        state.remainingTime = action.payload * MS_IN_MINUTE;
      state.breakTime = action.payload;
    },
    changeLongBreakTime: (state, action: PayloadAction<number>) => {
      if (
        state.isPause &&
        state.mode === "longBreak" &&
        state.remainingTime === state.longBreakTime * MS_IN_MINUTE
      )
        state.remainingTime = action.payload * MS_IN_MINUTE;
      state.longBreakTime = action.payload;
    },
    changeIsAutostart: (state, action: PayloadAction<boolean>) => {
      state.isAutostart = action.payload;
    },
    changeCyclesTillLongBreak: (state, action: PayloadAction<number>) => {
      state.cyclesTillLongBreak = action.payload;
    },
    setFocusMode: (state) => {
      state.mode = "focus";
      state.currentCycle = 0;
      state.isPause = true;
      state.remainingTime = state.focusTime * MS_IN_MINUTE;
    },
    setBreakMode: (state) => {
      state.mode = "break";
      state.currentCycle = 0;
      state.isPause = true;
      state.remainingTime = state.breakTime * MS_IN_MINUTE;
    },
    setLongBreakMode: (state) => {
      state.mode = "longBreak";
      state.currentCycle = 0;
      state.isPause = true;
      state.remainingTime = state.longBreakTime * MS_IN_MINUTE;
    },
  },
});

export default timerSlice.reducer;

export const {
  start,
  pause,
  tick,
  stop,
  changeFocusTime,
  changeBreakTime,
  changeLongBreakTime,
  changeIsAutostart,
  changeCyclesTillLongBreak,
  setFocusMode,
  setBreakMode,
  setLongBreakMode,
} = timerSlice.actions;

export const selectSettingsValues = (state: rootState) => {
  return {
    focusTime: state.focusTime,
    breakTime: state.breakTime,
    longBreakTime: state.longBreakTime,
    isAutostart: state.isAutostart,
    cyclesTillLongBreak: state.cyclesTillLongBreak,
  };
};

export const selectTimerValues = (state: rootState) => {
  return {
    isPause: state.isPause,
    mode: state.mode,
    remainingTime: state.remainingTime,
  };
};
