import styles from "@/styles/Settings.module.scss";
import { ErrorMessage, Field } from "formik";

export const SettingsField = ({
  title,
  name,
}: {
  title: string;
  name: string;
}) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {title}
      </label>
      <div className={styles.inputContainer}>
        <Field className={styles.input} type="number" name={name} id={name} />
      </div>
      <ErrorMessage name={name}>
        {(msg) => <div className={styles.error}>{msg}</div>}
      </ErrorMessage>
    </div>
  );
};
