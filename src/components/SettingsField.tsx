import { ErrorMessage, Field, Formik } from "formik";
import { number, object } from "yup";
import styles from "@/styles/Settings.module.scss";

export const SettingsField = ({
  title,
  name,
  initValue,
  onChange,
}: {
  title: string;
  name: string;
  initValue: number;
  onChange: (arg: number) => void;
}) => {
  return (
    <Formik
      initialValues={{ initValue }}
      onSubmit={({ initValue }) => {
        onChange(initValue);
        console.log(initValue);
      }}
      validationSchema={object({
        initValue: number()
          .typeError("Must be a number")
          .positive("Must be positive")
          .lessThan(60, "Can't be bigger than 1 hour")
          .integer("Must be a natural number")
          .required("Can't be empty"),
      })}
    >
      {({ submitForm }) => (
        <div className={styles.field}>
          <label className={styles.label} htmlFor={name}>
            {title}
          </label>
          <div className={styles.inputContainer}>
            <Field
              className={styles.input}
              type="number"
              name="initValue"
              id={name}
            />
            <button
              onClick={() => submitForm()}
              className={styles.changeButton}
            >
              Change
            </button>
          </div>
          <ErrorMessage name="initValue">
            {(msg) => <div className={styles.error}>{msg}</div>}
          </ErrorMessage>
        </div>
      )}
    </Formik>
  );
};
