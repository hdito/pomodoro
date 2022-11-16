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
    <label id={`field-${name}`} className={styles.label} htmlFor={name}>
      {title}
      <Field
        aria-errormessage={`error-${name}`}
        className={styles.input}
        type="number"
        name={name}
        id={name}
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <div role="alert" id={`error-${name}`} className={styles.error}>
            {msg}
          </div>
        )}
      </ErrorMessage>
    </label>
  );
};
