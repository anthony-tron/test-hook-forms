import { useCallback } from 'react';

import { Field, Form, Formik } from 'formik';
import { Autocomplete, Button, Select, TextField } from '@mui/material';

const jobs = [
  'Developer',
  'Manager',
  'Lawyer',
  'Student',
  'Professor',
];

export default function FormikDemo() {
  const handleSubmit = useCallback((values, { setSubmitting}) => {
    setTimeout(() => {
      alert(JSON.stringify(values));
      setSubmitting(false);
    }, 400);
  }, []);

  return (
    <Formik
      initialValues={{ email: '', firstName: '', lastName: '', job: '' }}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <Field as={TextField} type="email" name="email" label="Email" />

          <Field as={TextField} type="text" name="firstName" label="First name" />

          <Autocomplete
            onChange={(_, value) => setFieldValue('job', value)}
            renderInput={(params) => <TextField label="Job" {...params} /> }
            options={jobs.map((e) => ({ label: e }))}
            isOptionEqualToValue={(value, option) => {
              return value.label === option.label;
            }}
          />

          <Button type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
