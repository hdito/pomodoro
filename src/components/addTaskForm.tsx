import { addTask } from "@/features/store/timerSlice";
import styles from "@/styles/addTaskForm.module.scss";
import buttonStyles from "@/styles/button.module.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { string, object } from "yup";

export const AddTaskForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {isOpen ? (
        <Formik
          validationSchema={object({
            task: string()
              .required("Can't be empty")
              .max(25, "Title is too long"),
          })}
          initialValues={{ task: "" }}
          onSubmit={({ task }, { resetForm }) => {
            dispatch(addTask(task));
            resetForm();
          }}
        >
          {() => (
            <Form className={styles.form}>
              <label className={styles.label} htmlFor="task-input">
                Task
                <Field
                  className={styles.input}
                  name="task"
                  id="task-input"
                  type="text"
                />
                <ErrorMessage name="task">
                  {(msg) => <div className={styles.error}>{msg}</div>}
                </ErrorMessage>
              </label>
              <div className={styles["buttons-container"]}>
                <button
                  className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_grow}`}
                  type="submit"
                >
                  Add
                </button>
                <button
                  className={`${buttonStyles.button} ${buttonStyles.button_grow}`}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <button onClick={() => setIsOpen(true)} className={styles.button}>
          Add task
        </button>
      )}
    </>
  );
};
