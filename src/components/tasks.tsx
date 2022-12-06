import { selectTasks } from "@/features/store/timerSlice";
import { useSelector } from "react-redux";
import { TaskCard } from "@/components/taskCard";

export const Tasks = () => {
  const tasks = useSelector(selectTasks);
  return (
    <>
      {tasks ? (
        <>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </>
      ) : null}
    </>
  );
};
