import {
  changeSettings,
  setMode,
  start,
  tick,
} from "@/features/store/timerSlice";
import { MS_IN_MINUTE } from "@/utils/constants";
import {
  getCustomTimerState,
  getCustomTimerStore,
} from "@/utils/customTimerStore";
import { describe, expect, it } from "vitest";

describe("Timer", () => {
  describe("Timer behaviour", () => {
    it("Dispatching tick decrements remaining time by 1 second", () => {
      const store = getCustomTimerStore({ remainingTime: 5000 });
      store.dispatch(tick());

      expect(store.getState()).toEqual(
        getCustomTimerState({ remainingTime: 4000 })
      );
    });

    it("Switch modes after timer finishes", () => {
      const store = getCustomTimerStore({ remainingTime: 1000 });
      store.dispatch(tick());
      store.dispatch(tick());

      expect(store.getState()).toEqual(
        getCustomTimerState({ mode: "break", remainingTime: 5 * MS_IN_MINUTE })
      );
    });

    it("Increment current cycle after break finishes", () => {
      const store = getCustomTimerStore({ mode: "break", remainingTime: 1000 });
      store.dispatch(tick());
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
      store.dispatch(tick());

      expect(store.getState()).toEqual(
        getCustomTimerState({
          mode: "longBreak",
          remainingTime: 15 * MS_IN_MINUTE,
          currentCycle: 3,
        })
      );
    });

    it("Set mode to focus after finishing long break", () => {
      const store = getCustomTimerStore({
        mode: "longBreak",
        remainingTime: 1000,
        currentCycle: 3,
      });
      store.dispatch(tick());
      store.dispatch(tick());

      expect(store.getState()).toEqual(
        getCustomTimerState({
          mode: "focus",
          remainingTime: 25 * MS_IN_MINUTE,
          currentCycle: 4,
        })
      );
    });
  });
  describe("Changes in settings", () => {
    it("If user changes time settings of stopped timer it shows updated time", () => {
      const store = getCustomTimerStore({});
      store.dispatch(changeSettings({ focusTime: 1 }));

      expect(store.getState()).toEqual(
        getCustomTimerState({ focusTime: 1, remainingTime: 1 * MS_IN_MINUTE })
      );

      store.dispatch(setMode("break"));
      store.dispatch(changeSettings({ breakTime: 2 }));

      expect(store.getState()).toEqual(
        getCustomTimerState({
          mode: "break",
          focusTime: 1,
          breakTime: 2,
          remainingTime: 2 * MS_IN_MINUTE,
        })
      );

      store.dispatch(setMode("longBreak"));
      store.dispatch(changeSettings({ longBreakTime: 5 }));

      expect(store.getState()).toEqual(
        getCustomTimerState({
          mode: "longBreak",
          focusTime: 1,
          breakTime: 2,
          longBreakTime: 5,
          remainingTime: 5 * MS_IN_MINUTE,
        })
      );
    });

    it("If user changes settings of ticking timer it updates settings but remaining time stays intact", () => {
      const store = getCustomTimerStore({});
      store.dispatch(start());
      store.dispatch(
        changeSettings({
          focusTime: 5,
          breakTime: 6,
          longBreakTime: 7,
          isAutostart: true,
          cyclesTillLongBreak: 5,
        })
      );

      expect(store.getState()).toEqual(
        getCustomTimerState({
          focusTime: 5,
          breakTime: 6,
          longBreakTime: 7,
          isAutostart: true,
          cyclesTillLongBreak: 5,
          isPause: false,
        })
      );
    });
  });
});
