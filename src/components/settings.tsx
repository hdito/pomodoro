import { SettingsField } from "@/components/settingsField";
import {
  changeSettings,
  selectSettingsValues,
} from "@/features/store/timerSlice";
import buttonStyles from "@/styles/button.module.scss";
import styles from "@/styles/settings.module.scss";
import { Form, Formik } from "formik";
import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import { number, object } from "yup";

export const Settings = () => {
  const settingValues = useSelector(selectSettingsValues);
  const {
    focusTime,
    breakTime,
    longBreakTime,
    isAutostart,
    cyclesTillLongBreak,
  } = settingValues;

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={styles["settings-button"]}
      >
        <IoSettingsSharp className={styles["settings-icon"]} fill="inherit" />
        Settings
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
              cyclesTillLongBreak,
            }}
            onSubmit={(values) => {
              console.log(values);
              const updatedSettings: { [key: string]: number | boolean } = {};
              let isNeedUpdate = false;
              Object.keys(values).map((key) => {
                if (
                  (key === "focusTime" ||
                    key === "breakTime" ||
                    key === "longBreakTime" ||
                    key === "focusTime" ||
                    key === "isAutostart" ||
                    key === "cyclesTillLongBreak") &&
                  settingValues[key] !== values[key]
                ) {
                  updatedSettings[key] = values[key];
                  isNeedUpdate = true;
                }
              });
              if (isNeedUpdate) {
                dispatch(changeSettings(updatedSettings));
              }
              setIsOpen(false);
            }}
            validationSchema={object({
              focusTime: number()
                .typeError("Must be a number")
                .positive("Must be positive")
                .lessThan(60, "Can't be bigger than 59 minutes")
                .integer("Must be a natural number")
                .required("Can't be empty"),
              breakTime: number()
                .typeError("Must be a number")
                .positive("Must be positive")
                .lessThan(61, "Can't be bigger than 59 minutes")
                .integer("Must be a natural number")
                .required("Can't be empty"),
              longBreakTime: number()
                .typeError("Must be a number")
                .positive("Must be positive")
                .lessThan(60, "Can't be bigger than 59 minutes")
                .integer("Must be a natural number")
                .required("Can't be empty"),
              cyclesTillLongBreak: number()
                .typeError("Must be a number")
                .positive("Must be positive")
                .lessThan(10, "You should rest sometimes")
                .integer("Must be a natural number")
                .required("Can't be empty"),
            })}
            validateOnBlur={false}
          >
            {({ values, setFieldValue }) => (
              <Form className={styles.popup}>
                <h1 className={styles.header}>Settings</h1>
                <div className={styles["settings-block"]}>
                  <h2 className={styles.header}>Time (minutes)</h2>
                  {[
                    { name: "focusTime", title: "Focus" },
                    { name: "breakTime", title: "Break" },
                    { name: "longBreakTime", title: "Long break" },
                  ].map(({ name, title }) => (
                    <SettingsField key={name} name={name} title={title} />
                  ))}
                </div>
                <label htmlFor="autostart" className={styles.switch}>
                  <Switch
                    checked={values.isAutostart}
                    name="isAutostart"
                    id="autostart"
                    checkedIcon={false}
                    uncheckedIcon={false}
                    onChange={(checked) =>
                      setFieldValue("isAutostart", checked)
                    }
                  />
                  Autostart timers
                </label>
                <div className={styles["settings-block"]}>
                  <SettingsField
                    title="Count of cycles between long breaks"
                    name="cyclesTillLongBreak"
                  />
                </div>
                <div className={styles.buttons}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={buttonStyles.button}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className={`${buttonStyles.button} ${buttonStyles.button_primary}`}
                    type="submit"
                  >
                    Save
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
