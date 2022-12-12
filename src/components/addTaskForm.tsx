import { addTask } from "@/features/store/timerSlice";
import styles from "@/styles/addTaskForm.module.scss";
import buttonStyles from "@/styles/button.module.scss";
import inputStyles from "@/styles/input.module.scss";
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
          validateOnBlur={false}
        >
          {() => (
            <Form className={styles.form}>
              <label className={styles.label} htmlFor="task-input">
                Task
                <Field
                  className={inputStyles.input}
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
                  className={`${buttonStyles.button}`}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className={`${buttonStyles.button} ${buttonStyles.button_primary}`}
                  type="submit"
                >
                  Add
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
