import { format } from "date-fns";
import block from "module-clsx";
import { useEffect, useRef, useState } from "react";
import { HiPause, HiPlay, HiStop } from "react-icons/hi2";
import styles from "../styles/Home.module.scss";

export default function Timer() {
  const [isPause, setIsPause] = useState(true);
  const [mode, setMode] = useState<"focus" | "break" | "longBreak">("focus");
  const tickRef = useRef<NodeJS.Timeout | null>(null);
  const [iterations, setIterations] = useState(0);
  const focusTime = 4000;
  const breakTime = 2000;
  const longBreakTime = 4000;
  const [remainingTime, setRemainingTime] = useState(focusTime);

  const b = block(styles);

  useEffect(() => {
    if (isPause) return;
    if (remainingTime <= 0 && tickRef.current) {
      setRemainingTime(mode === "focus" ? breakTime : focusTime);
      setMode((prevMode) => {
        switch (prevMode) {
          case "focus": {
            if (iterations > 3) {
              setIterations(0);
              return "longBreak";
            }
            setIterations((prev) => prev + 1);
            return "break";
          }
          case "break":
            return "focus";
          case "longBreak":
            return "focus";
        }
      });
      setIsPause(true);
      clearInterval(tickRef.current);
    }
  }, [remainingTime, isPause, mode, iterations]);

  const initFocus = () => {
    setMode("focus");
    setIsPause(true);
    setRemainingTime(focusTime);
    if (tickRef.current) clearInterval(tickRef.current);
  };

  const initBreak = () => {
    setMode("break");
    setIsPause(true);
    setRemainingTime(breakTime);
    if (tickRef.current) clearInterval(tickRef.current);
  };

  const initLongBreak = () => {
    setMode("longBreak");
    setIsPause(true);
    setRemainingTime(longBreakTime);
    if (tickRef.current) clearInterval(tickRef.current);
  };

  const pause = () => {
    if (!tickRef.current) return;
    clearInterval(tickRef.current);
    setIsPause(true);
  };

  const stop = () => {
    if (!tickRef.current) return;
    clearInterval(tickRef.current);
    setIsPause(true);
    switch (mode) {
      case "break":
        setRemainingTime(breakTime);
        break;
      case "focus":
        setRemainingTime(focusTime);
        break;
      case "longBreak":
        setRemainingTime(longBreakTime);
        break;
    }
  };

  const resume = () => {
    tickRef.current = setInterval(() => {
      setRemainingTime((prev) => prev - 1000);
    }, 1000);
    setIsPause(false);
  };

  return (
    <div
      className={b("container", {
        focus: mode === "focus",
        break: mode === "break",
        longBreak: mode === "longBreak",
      })}
    >
      <div className={styles.timer}>
        <div className={styles.buttonContainer}>
          <button
            className={b("button", { active: mode === "focus" })}
            onClick={() => initFocus()}
          >
            Focus
          </button>
          <button
            className={b("button", { active: mode === "break" })}
            onClick={() => initBreak()}
          >
            Break
          </button>
          <button
            onClick={() => initLongBreak()}
            className={b("button", { active: mode === "longBreak" })}
          >
            Long break
          </button>
        </div>
        <div className={styles.time}>{format(remainingTime, "mm:ss")}</div>
        <div className={styles.controlButtons}>
          <button
            className={styles.controlButton}
            onClick={() => {
              if (isPause) {
                resume();
                return;
              }
              pause();
            }}
          >
            {isPause ? <HiPlay title="Start" /> : <HiPause title="Pause" />}
          </button>
          <button className={styles.controlButton}>
            <HiStop title="Stop" onClick={() => stop()} />
          </button>
        </div>
      </div>
    </div>
  );
}
