import { useId } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './ReservationForm.module.css';

export const FormikDatePicker = ({ name, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  return (
    <div className={styles.fieldGroup}>
      <DatePicker
        selected={field.value ? new Date(field.value) : null}
        onChange={date => setFieldValue(name, date)}
        {...props}
        className={styles.input}
      />
      {meta.touched && meta.error && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </div>
  );
};

export const ReservationForm = ({ onSubmit }) => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const commentFieldId = useId();

  const initialValues = {
    name: '',
    email: '',
    reservationDate: null,
    comment: '',
  };

  const handleSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must be 50 characters or less')
      .required('Required'),
    email: Yup.string()
      .trim()
      .email('Invalid email format')
      .required('Email is required'),
    reservationDate: Yup.date()
      .nullable()
      .min(new Date(), 'Booking date must be today or later'),
    comment: Yup.string()
      .trim()
      .matches(
        /^[a-zA-Z0-9\s,.?!'";:()]+$/,
        'Comment must not have special symbols, only letters, numbers and punctuation'
      ),
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Book your car now</h3>
        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          <div className={styles.fieldsContainer}>
            <div className={styles.fieldGroup}>
              <Field
                id={nameFieldId}
                name="name"
                placeholder="Name*"
                className={styles.input}
              />
              <ErrorMessage name="name" component="span" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                id={emailFieldId}
                name="email"
                placeholder="Email*"
                className={styles.input}
              />
              <ErrorMessage name="email" component="span" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <FormikDatePicker
                name="reservationDate"
                placeholderText="Select reservation date"
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
              />
              <ErrorMessage name="reservationDate" component="span" className={styles.error} />
            </div>

            <div className={styles.fieldGroup}>
              <Field
                id={commentFieldId}
                as="textarea"
                rows={3}
                name="comment"
                placeholder="Comment"
                className={styles.textarea}
              />
              <ErrorMessage name="comment" component="span" className={styles.error} />
            </div>
          </div>

          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.button}>Send</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};