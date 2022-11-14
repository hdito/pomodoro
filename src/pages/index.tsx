import { format } from "date-fns";
import block from "module-clsx";
import { useEffect, useRef, useState } from "react";
import { Settings } from "@/components/settings";
import styles from "@/styles/Home.module.scss";
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

export default function Timer() {
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
        <div className={styles.buttonContainer}>
          <button
            className={b("button", { active: mode === "focus" })}
            onClick={() => dispatch(setFocusMode())}
          >
            Focus
          </button>
          <button
            className={b("button", { active: mode === "break" })}
            onClick={() => dispatch(setBreakMode())}
          >
            Break
          </button>
          <button
            onClick={() => dispatch(setLongBreakMode())}
            className={b("button", { active: mode === "longBreak" })}
          >
            Long break
          </button>
          <Settings />
        </div>
        <div className={styles.time}>{format(remainingTime, "mm:ss")}</div>
        <div className={styles.controlButtons}>
          {isPause ? (
            <button
              className={`${buttonStyles.button} ${buttonStyles.button_minWidth}`}
              onClick={() => dispatch(start())}
            >
              Start
            </button>
          ) : (
            <button
              className={`${buttonStyles.button} ${buttonStyles.button_minWidth}`}
              onClick={() => dispatch(pause())}
            >
              Pause
            </button>
          )}
          <button
            className={`${buttonStyles.button} ${buttonStyles.button_stop}`}
            onClick={() => dispatch(stop())}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
