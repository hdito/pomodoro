import styles from "@/styles/header.module.scss";
import { Settings } from "./settings";

export const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles["header-text"]}>Pomodoro</span>
      <Settings />
    </header>
  );
};
