import { tick } from "@/features/store/timerSlice";
import { MS_IN_MINUTE } from "@/utils/constants";
import {
  getCustomTimerState,
  getCustomTimerStore,
} from "@/utils/customTimerStore";
import { describe, expect, it } from "vitest";

describe("Timer reducer", () => {
  describe("Tick action", () => {
    it("Dispatching tick decrement remaining time by 1 second", () => {
      const store = getCustomTimerStore({ remainingTime: 5000 });
      store.dispatch(tick());
      expect(store.getState()).toEqual(
        getCustomTimerState({ remainingTime: 4000 })
      );
    });

    it("Switch modes after reaches 0", () => {
      const store = getCustomTimerStore({ remainingTime: 1000 });
      store.dispatch(tick());
      expect(store.getState()).toEqual(
        getCustomTimerState({ mode: "break", remainingTime: 5 * MS_IN_MINUTE })
      );
    });

    it("Increment current cycle after break finishes", () => {
      const store = getCustomTimerStore({ mode: "break", remainingTime: 1000 });
      store.dispatch(tick());
      expect(store.getState()).toEqual(
        getCustomTimerState({
          mode: "focus",
          remainingTime: 25 * MS_IN_MINUTE,
          currentCycle: 2,
        })
      );
    });

    it("Switch to long break after finishing 3 focus periods", () => {
      const store = getCustomTimerStore({
        mode: "focus",
        remainingTime: 1000,
        currentCycle: 3,
      });
      store.dispatch(tick());
      expect(store.getState()).toEqual(
        getCustomTimerState({
          mode: "longBreak",
          remainingTime: 15 * MS_IN_MINUTE,
          currentCycle: 3,
        })
      );
    });

    it("Reset cycles after finishing long break", () => {
      const store = getCustomTimerStore({
        mode: "longBreak",
        remainingTime: 1000,
        currentCycle: 3,
      });
      store.dispatch(tick());
      expect(store.getState()).toEqual(
        getCustomTimerState({
          mode: "focus",
          remainingTime: 25 * MS_IN_MINUTE,
          currentCycle: 1,
        })
      );
    });
  });
});
