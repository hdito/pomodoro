import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import styles from "../styles/Settings.module.scss";
import { ErrorMessage, Field, Formik } from "formik";
import { number, object } from "yup";

export const Settings = ({
  focusTime,
  breakTime,
  longBreakTime,
  onChangeFocusTime,
  onChangeBreakTime,
  onChangeLongBreakTime,
}: {
  focusTime: number;
  breakTime: number;
  longBreakTime: number;
  onChangeFocusTime: (focusTime: number) => void;
  onChangeBreakTime: (breakTime: number) => void;
  onChangeLongBreakTime: (longBreakTime: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.settings}>
        <IoSettingsSharp fill="white" title="Settings" />
      </button>
      {isOpen && (
        <div
          className={styles.shade}
          onClick={(e) => {
            if (
              e.target instanceof Element &&
              e.target.closest(`.${styles.popup}`)
            )
              return;
            setIsOpen(false);
          }}
        >
          <div className={styles.popup}>
            <h1>Settings</h1>
            <Formik
              initialValues={{ focusTime }}
              onSubmit={({ focusTime }) => onChangeFocusTime(focusTime)}
              validationSchema={object({
                focusTime: number()
                  .typeError("Must be a number")
                  .positive("Must be positive")
                  .lessThan(60, "Can't be bigger than 1 hour")
                  .integer("Must be a natural number")
                  .required("Can't be empty"),
              })}
            >
              {({ submitForm }) => (
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="focusInput">
                    Focus time
                  </label>
                  <div className={styles.inputContainer}>
                    <Field
                      className={styles.input}
                      type="number"
                      name="focusTime"
                      id="focusInput"
                    />
                    <button
                      onClick={() => submitForm()}
                      className={styles.changeButton}
                    >
                      Change
                    </button>
                  </div>
                  <ErrorMessage name="focusTime">
                    {(msg) => <div className={styles.error}>{msg}</div>}
                  </ErrorMessage>
                </div>
              )}
            </Formik>
            <Formik
              initialValues={{ breakTime }}
              onSubmit={({ breakTime }) => {
                onChangeBreakTime(breakTime);
                console.log(breakTime);
              }}
              validationSchema={object({
                breakTime: number()
                  .typeError("Must be a number")
                  .positive("Must be positive")
                  .lessThan(60, "Can't be bigger than 1 hour")
                  .integer("Must be a natural number")
                  .required("Can't be empty"),
              })}
            >
              {({ submitForm }) => (
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="breakInput">
                    Break time
                  </label>
                  <div className={styles.inputContainer}>
                    <Field
                      className={styles.input}
                      type="number"
                      name="breakTime"
                      id="breakInput"
                    />
                    <button
                      onClick={() => submitForm()}
                      className={styles.changeButton}
                    >
                      Change
                    </button>
                  </div>
                  <ErrorMessage name="breakTime">
                    {(msg) => <div className={styles.error}>{msg}</div>}
                  </ErrorMessage>
                </div>
              )}
            </Formik>
            <Formik
              initialValues={{ longBreakTime }}
              onSubmit={({ longBreakTime }) =>
                onChangeLongBreakTime(longBreakTime)
              }
              validationSchema={object({
                longBreakTime: number()
                  .typeError("Must be a number")
                  .positive("Must be positive")
                  .lessThan(60, "Can't be bigger than 1 hour")
                  .integer("Must be a natural number")
                  .required("Can't be empty"),
              })}
            >
              {({ submitForm }) => (
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="longBreakInput">
                    Long break time
                  </label>
                  <div className={styles.inputContainer}>
                    <Field
                      className={styles.input}
                      type="number"
                      name="longBreakTime"
                      id="longBreakInput"
                    />
                    <button
                      onClick={() => submitForm()}
                      className={styles.changeButton}
                    >
                      Change
                    </button>
                  </div>
                  <ErrorMessage name="longBreakTime">
                    {(msg) => <div className={styles.error}>{msg}</div>}
                  </ErrorMessage>
                </div>
              )}
            </Formik>
            <button onClick={() => setIsOpen(false)} className={styles.close}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
