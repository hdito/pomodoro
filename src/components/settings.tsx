import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import Switch from "react-switch";
import styles from "@/styles/Settings.module.scss";
import buttonStyles from "@/styles/button.module.scss";
import { SettingsField } from "@/components/settingsField";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "@/features/store/store";
import { ErrorMessage, Field, Formik } from "formik";
import { number, object } from "yup";
import {
  changeBreakTime,
  changeFocusTime,
  changeIsAutoplay,
  changeLongBreakTime,
} from "@/features/store/timerSlice";

export const Settings = () => {
  const focusTime = useSelector((store: rootState) => store.focusTime);
  const breakTime = useSelector((store: rootState) => store.breakTime);
  const longBreakTime = useSelector((store: rootState) => store.longBreakTime);
  const isAutoplay = useSelector((store: rootState) => store.isAutoplay);
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
          <div className={styles.popup}>
            <h1>Settings</h1>
            <Formik
              initialValues={{
                focusTime,
                breakTime,
                longBreakTime,
                isAutoplay,
              }}
              onSubmit={(values) => {
                if (values.breakTime !== breakTime)
                  dispatch(changeBreakTime(values.breakTime));
                if (values.focusTime !== focusTime)
                  dispatch(changeFocusTime(values.focusTime));
                if (values.longBreakTime !== longBreakTime)
                  dispatch(changeLongBreakTime(values.longBreakTime));
                if (values.isAutoplay !== isAutoplay)
                  dispatch(changeIsAutoplay(values.isAutoplay));
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
              {({ values, submitForm, setFieldValue }) => (
                <>
                  {[
                    { name: "focusTime", title: "Focus time" },
                    { name: "breakTime", title: "Break time" },
                    { name: "longBreakTime", title: "Long break time" },
                  ].map(({ name, title }) => (
                    <SettingsField key={name} name={name} title={title} />
                  ))}
                  <label className={styles.switch}>
                    <Switch
                      checked={values.isAutoplay}
                      name="isAutoplay"
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onChange={(checked) =>
                        setFieldValue("isAutoplay", checked)
                      }
                    />
                    Autoplay
                  </label>
                  <div className={styles.buttons}>
                    <button
                      className={`${buttonStyles.button} ${buttonStyles.button_save}`}
                      onClick={() => submitForm()}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className={buttonStyles.button}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};
