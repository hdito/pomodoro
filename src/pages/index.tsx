import { Settings } from "@/components/settings";
import {
  pause,
  selectTimerValues,
  setBreakMode,
  setFocusMode,
  setLongBreakMode,
  start,
  stop,
  tick,
} from "@/features/store/timerSlice";
import buttonStyles from "@/styles/button.module.scss";
import styles from "@/styles/Timer.module.scss";
import { Timeout } from "@/utils/timeout";
import { format } from "date-fns";
import block from "module-clsx";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Timer() {
  const { isPause, mode, remainingTime } = useSelector(selectTimerValues);
  const tickRef = useRef<Timeout | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPause && !(tickRef.current instanceof Timeout))
      tickRef.current = new Timeout(() => {
        dispatch(tick());
      }, 1000);
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
        <h1 className={`${styles.time}`}>{format(remainingTime, "mm:ss")}</h1>
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
