import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { MS_IN_MINUTE, MS_IN_SECOND } from "@/utils/constants";
import { rootState } from "./store";
import { task } from "@/types/task";

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
  tasks: task[];
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
  tasks: [],
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
      if (state.remainingTime >= 0) return;
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
    changeSettings: (
      state,
      action: PayloadAction<{
        focusTime?: number;
        breakTime?: number;
        longBreakTime?: number;
        isAutostart?: boolean;
        cyclesTillLongBreak?: number;
      }>
    ) => {
      Object.entries(action.payload).map(([key, value]) => {
        if (
          (key === "focusTime" ||
            key === "breakTime" ||
            key === "longBreakTime") &&
          typeof value === "number"
        ) {
          if (
            state.isPause &&
            state.mode === key.replace(/Time/, "") &&
            state.remainingTime === state[key] * MS_IN_MINUTE
          ) {
            state.remainingTime = value * MS_IN_MINUTE;
          }
          state[key] = value;
        } else {
          if (key === "isAutostart" && typeof value === "boolean")
            state[key] = value;
          else if (key === "cyclesTillLongBreak" && typeof value === "number")
            state[key] = value;
        }
      });
    },
    setMode: (
      state,
      action: PayloadAction<"focus" | "break" | "longBreak">
    ) => {
      state.mode = action.payload;
      state.currentCycle = 1;
      state.isPause = true;
      switch (action.payload) {
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
    addTask: {
      reducer: (
        state,
        action: PayloadAction<{
          id: string;
          content: string;
          createdAt: number;
          isFinished: boolean;
        }>
      ) => {
        state.tasks.push(action.payload);
      },
      prepare: (content: string) => {
        return {
          payload: {
            content,
            id: nanoid(),
            createdAt: Date.now(),
            isFinished: false,
          },
        };
      },
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.isFinished = !task.isFinished;
    },
  },
});

export default timerSlice.reducer;

export const {
  start,
  pause,
  tick,
  stop,
  changeSettings,
  setMode,
  addTask,
  deleteTask,
  toggleTask,
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

export const selectTasks = (state: rootState) => {
  return state.tasks
    .map((task) => task)
    .sort((task1, task2) => task2.createdAt - task1.createdAt)
    .sort(
      (task1, task2) => Number(task1.isFinished) - Number(task2.isFinished)
    );
};
