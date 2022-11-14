import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import Switch from "react-switch";
import styles from "@/styles/Settings.module.scss";
import buttonStyles from "@/styles/button.module.scss";
import { SettingsField } from "@/components/settingsField";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "@/features/store/store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { number, object } from "yup";
import {
  changeBreakTime,
  changeFocusTime,
  changeIsAutostart,
  changeLongBreakTime,
} from "@/features/store/timerSlice";

export const Settings = () => {
  const focusTime = useSelector((store: rootState) => store.focusTime);
  const breakTime = useSelector((store: rootState) => store.breakTime);
  const longBreakTime = useSelector((store: rootState) => store.longBreakTime);
  const isAutostart = useSelector((store: rootState) => store.isAutostart);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={styles.settings}>
        <IoSettingsSharp fill="inherit" title="Settings" />
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
          <Formik
            initialValues={{
              focusTime,
              breakTime,
              longBreakTime,
              isAutostart,
            }}
            onSubmit={(values) => {
              if (values.breakTime !== breakTime)
                dispatch(changeBreakTime(values.breakTime));
              if (values.focusTime !== focusTime)
                dispatch(changeFocusTime(values.focusTime));
              if (values.longBreakTime !== longBreakTime)
                dispatch(changeLongBreakTime(values.longBreakTime));
              if (values.isAutostart !== isAutostart)
                dispatch(changeIsAutostart(values.isAutostart));
              setIsOpen(false);
            }}
            validationSchema={object({
              focusTime: number()
                .typeError("Must be a number")
                .positive("Must be positive")
                .lessThan(60, "Can't be bigger than 1 hour")
                .integer("Must be a natural number")
                .required("Can't be empty"),
              breakTime: number()
                .typeError("Must be a number")
                .positive("Must be positive")
                .lessThan(60, "Can't be bigger than 1 hour")
                .integer("Must be a natural number")
                .required("Can't be empty"),
              longBreakTime: number()
                .typeError("Must be a number")
                .positive("Must be positive")
                .lessThan(60, "Can't be bigger than 1 hour")
                .integer("Must be a natural number")
                .required("Can't be empty"),
            })}
          >
            {({ values, setFieldValue }) => (
              <Form className={styles.popup}>
                <h1 className={styles.header}>Settings</h1>
                <div className={styles["time-block"]}>
                  <h2 className={styles.header}>Time (minutes)</h2>
                  {[
                    { name: "focusTime", title: "Focus" },
                    { name: "breakTime", title: "Break" },
                    { name: "longBreakTime", title: "Long break" },
                  ].map(({ name, title }) => (
                    <SettingsField key={name} name={name} title={title} />
                  ))}
                </div>
                <label className={styles.switch}>
                  <Switch
                    checked={values.isAutostart}
                    name="isAutostart"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={(checked) =>
                      setFieldValue("isAutostart", checked)
                    }
                  />
                  Autostart timers
                </label>
                <div className={styles.buttons}>
                  <button
                    className={`${buttonStyles.button} ${buttonStyles.button_save} ${buttonStyles.button_grow}`}
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`${buttonStyles.button} ${buttonStyles.button_grow}`}
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};
