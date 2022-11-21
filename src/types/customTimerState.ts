export type customTimerState = {
  isPause?: boolean;
  mode?: "focus" | "break" | "longBreak";
  focusTime?: number;
  breakTime?: number;
  longBreakTime?: number;
  remainingTime?: number;
  isAutostart?: boolean;
  currentCycle?: number;
  cyclesTillLongBreak?: number;
};
