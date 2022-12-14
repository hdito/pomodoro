import {
  pause,
  selectTimerValues,
  setMode,
  start,
  stop,
  tick,
} from "@/features/store/timerSlice";
import buttonStyles from "@/styles/button.module.scss";
import styles from "@/styles/timer.module.scss";
import { getOrdinalString } from "@/utils/getOrdinalString";
import { Timeout } from "@/utils/timeout";
import { useAlarm } from "@/utils/useAlarm";
import { format } from "date-fns";
import block from "module-clsx";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Timer = () => {
  const { isPause, mode, remainingTime, currentCycle } =
    useSelector(selectTimerValues);
  const tickRef = useRef<Timeout | null>(null);
  const playAlarm = useAlarm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPause)
      tickRef.current = new Timeout(() => {
        dispatch(tick());
        if (remainingTime !== 0) return;
        playAlarm();
      }, 1000);
    if (isPause && tickRef.current instanceof Timeout) {
      tickRef.current.clear();
    }
  }, [playAlarm, remainingTime, isPause, dispatch]);

  const b = block(styles);

  return (
    <div className={styles.timer}>
      <div className={styles["mode-button-container"]}>
        <button
          className={b("mode-button", { active: mode === "focus" })}
          onClick={() => dispatch(setMode("focus"))}
          aria-current={mode === "focus" ? "step" : "false"}
        >
          Focus
        </button>
        <button
          className={b("mode-button", { active: mode === "break" })}
          onClick={() => dispatch(setMode("break"))}
          aria-current={mode === "break" ? "step" : "false"}
        >
          Break
        </button>
        <button
          onClick={() => dispatch(setMode("longBreak"))}
          className={b("mode-button", { active: mode === "longBreak" })}
          aria-current={mode === "longBreak" ? "step" : "false"}
        >
          Long break
        </button>
      </div>
      <div>
        <h1 role="timer" className={`${styles.time}`}>
          {format(remainingTime, "mm:ss")}
        </h1>
        <div className={styles.cycle}>
          {`${getOrdinalString(currentCycle)} cycle`}
        </div>
      </div>
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
  );
};
