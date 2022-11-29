import { deleteTask, toggleTask } from "@/features/store/timerSlice";
import { task } from "@/types/task";
import { useDispatch } from "react-redux";
import { IoTrash } from "react-icons/io5";
import styles from "@/styles/taskCard.module.scss";
import block from "module-clsx";

export const TaskCard = ({ task }: { task: task }) => {
  const dispatch = useDispatch();
  const b = block(styles);
  return (
    <div className={styles.card}>
      <label className={styles.label} htmlFor={`checkbox-${task.id}`}>
        <input
          id={`checkbox-${task.id}`}
          type="checkbox"
          checked={task.isFinished}
          className={styles.input}
          onChange={() => dispatch(toggleTask(task.id))}
        />
        <span className={b("content", { finished: task.isFinished })}>
          {task.content}
        </span>
      </label>
      <button
        className={styles["delete-button"]}
        onClick={() => dispatch(deleteTask(task.id))}
      >
        <IoTrash title="Delete" />
      </button>
    </div>
  );
};
