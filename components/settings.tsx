import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import styles from "../styles/Settings.module.scss";
import { ErrorMessage, Field, Formik } from "formik";
import { number, object } from "yup";
import { SettingsField } from "./SettingsField";
import Switch from "react-switch";

export const Settings = ({
  focusTime,
  breakTime,
  longBreakTime,
  autoplay,
  onChangeFocusTime,
  onChangeBreakTime,
  onChangeLongBreakTime,
  onChangeAutoplay,
}: {
  focusTime: number;
  breakTime: number;
  longBreakTime: number;
  autoplay: boolean;
  onChangeFocusTime: (focusTime: number) => void;
  onChangeBreakTime: (breakTime: number) => void;
  onChangeLongBreakTime: (longBreakTime: number) => void;
  onChangeAutoplay: (autoplay: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const fields = [
    {
      title: "Focus time",
      name: "focusTime",
      initValue: focusTime,
      onChange: onChangeFocusTime,
    },
    {
      title: "Break time",
      name: "breakTime",
      initValue: breakTime,
      onChange: onChangeBreakTime,
    },
    {
      title: "Lonk break time",
      name: "longBreakTime",
      initValue: longBreakTime,
      onChange: onChangeLongBreakTime,
    },
  ];

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
            {fields.map((field) => (
              <SettingsField
                key={field.name}
                title={field.title}
                name={field.name}
                onChange={field.onChange}
                initValue={field.initValue}
              />
            ))}
            <label className={styles.switch}>
              <Switch
                uncheckedIcon={false}
                checkedIcon={false}
                checked={autoplay}
                onChange={(checked) => onChangeAutoplay(checked)}
              />
              Autoplay
            </label>
            <button onClick={() => setIsOpen(false)} className={styles.close}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
