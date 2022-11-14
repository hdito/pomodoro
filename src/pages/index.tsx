import { format } from "date-fns";
import block from "module-clsx";
import { useEffect, useRef, useState } from "react";
import { Settings } from "../components/settings";
import styles from "../styles/Home.module.scss";

export default function Timer() {
  const [isPause, setIsPause] = useState(true);
  const [mode, setMode] = useState<"focus" | "break" | "longBreak">("focus");
  const [iterations, setIterations] = useState(0);
  const [focusTime, setFocusTime] = useState(1);
  const [breakTime, setBreakTime] = useState(2);
  const [longBreakTime, setLongBreakTime] = useState(4);
  const [remainingTime, setRemainingTime] = useState(focusTime * 60 * 1000);
  const [autoplay, setAutoplay] = useState(false);
  const tickRef = useRef<NodeJS.Timeout | null>(null);

  const b = block(styles);

  useEffect(() => {
    if (isPause) return;
    if (remainingTime > 0 || !tickRef.current) return;
    console.timeLog();
    setMode((prevMode) => {
      switch (prevMode) {
        case "focus": {
          if (iterations >= 2) {
            setRemainingTime(longBreakTime * 60 * 1000);
            return "longBreak";
          }
          setRemainingTime(breakTime * 60 * 1000);
          console.log("ugh");
          setIterations((prev) => prev + 1);
          return "break";
        }
        case "break":
          setRemainingTime(focusTime * 60 * 1000);
          return "focus";
        case "longBreak":
          setRemainingTime(focusTime * 60 * 1000);
          setIterations(0);
          return "focus";
      }
    });
    if (autoplay) return;
    setIsPause(true);
    clearInterval(tickRef.current);
  }, [remainingTime]);

  const initFocus = () => {
    setMode("focus");
    setIsPause(true);
    setRemainingTime(focusTime * 60 * 1000);
    if (tickRef.current) clearInterval(tickRef.current);
  };

  const initBreak = () => {
    setIterations(0);
    setMode("break");
    setIsPause(true);
    setRemainingTime(breakTime * 60 * 1000);
    if (tickRef.current) clearInterval(tickRef.current);
  };

  const initLongBreak = () => {
    setMode("longBreak");
    setIsPause(true);
    setRemainingTime(longBreakTime * 60 * 1000);
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
      case "focus":
        setRemainingTime(focusTime * 60 * 1000);
        break;
      case "break":
        setRemainingTime(breakTime * 60 * 1000);
        break;
      case "longBreak":
        setRemainingTime(longBreakTime * 60 * 1000);
        break;
    }
  };

  const resume = () => {
    console.time();
    tickRef.current = setInterval(() => {
      setRemainingTime((prev) => prev - 1000);
    }, 1000);
    setIsPause(false);
  };

  return (
    <div className={styles.container}>
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
          <Settings
            focusTime={focusTime}
            breakTime={breakTime}
            longBreakTime={longBreakTime}
            autoplay={autoplay}
            onChangeFocusTime={(focusTime) => {
              setFocusTime(focusTime);
              if (mode === "focus") stop();
            }}
            onChangeBreakTime={(breakTime) => {
              setBreakTime(breakTime);
              if (mode === "break") stop();
            }}
            onChangeLongBreakTime={(longBreakTime) => {
              setLongBreakTime(longBreakTime);
              if (mode === "longBreak") stop();
            }}
            onChangeAutoplay={setAutoplay}
          />
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
            {isPause ? "Start" : "Pause"}
          </button>
          <button className={styles.controlButton} onClick={() => stop()}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
