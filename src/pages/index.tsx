import { AddTaskForm } from "@/components/addTaskForm";
import { Header } from "@/components/header";
import { Tasks } from "@/components/tasks";
import { Timer } from "@/features/timer/timer";
import styles from "@/styles/mainPage.module.scss";

function MainPage() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <Timer />
        <AddTaskForm />
        <Tasks />
      </div>
    </div>
  );
}

export default MainPage;
