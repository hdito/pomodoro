import { format } from "date-fns";
import block from "module-clsx";
import { useEffect, useRef, useState } from "react";
import { Settings } from "@/components/settings";
import styles from "@/styles/Timer.module.scss";
import buttonStyles from "@/styles/button.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  setBreakMode,
  setFocusMode,
  setLongBreakMode,
  stop,
  pause,
  start,
  tick,
} from "@/features/store/timerSlice";
import { rootState } from "@/features/store/store";
import { Timeout } from "@/utils/timeout";
import { Fira_Code } from "@next/font/google";

const FiraCode = Fira_Code({
  fallback: ["monospace"],
  weight: "400",
  subsets: ["latin"],
});

export function Timer() {
  const isPause = useSelector((store: rootState) => store.isPause);
  const mode = useSelector((store: rootState) => store.mode);
  const remainingTime = useSelector((store: rootState) => store.remainingTime);
  const tickRef = useRef<Timeout | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPause && !(tickRef.current instanceof Timeout))
      tickRef.current = new Timeout(() => {
        dispatch(tick());
      }, 500);
    if (isPause && tickRef.current instanceof Timeout) {
      tickRef.current.clear();
      tickRef.current = null;
    }
  }, [isPause, dispatch]);

  const b = block(styles);

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <div className={styles["mode-button-container"]}>
          <button
            className={b("mode-button", { active: mode === "focus" })}
            onClick={() => dispatch(setFocusMode())}
          >
            Focus
          </button>
          <button
            className={b("mode-button", { active: mode === "break" })}
            onClick={() => dispatch(setBreakMode())}
          >
            Break
          </button>
          <button
            onClick={() => dispatch(setLongBreakMode())}
            className={b("mode-button", { active: mode === "longBreak" })}
          >
            Long break
          </button>
          <Settings />
        </div>
        <h1 className={`${styles.time} ${FiraCode.className}`}>
          {format(remainingTime, "mm:ss")}
        </h1>
        <div className={styles["control-buttons"]}>
          {isPause ? (
            <button
              className={`${buttonStyles.button} ${buttonStyles.button_grow}`}
              onClick={() => dispatch(start())}
            >
              Start
            </button>
          ) : (
            <button
              className={`${buttonStyles.button} ${buttonStyles.button_grow}`}
              onClick={() => dispatch(pause())}
            >
              Pause
            </button>
          )}
          <button
            className={`${buttonStyles.button} ${buttonStyles.button_stop} ${buttonStyles.button_grow}`}
            onClick={() => dispatch(stop())}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default Timer;
