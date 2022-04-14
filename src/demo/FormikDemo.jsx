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

// Thank you! https://github.com/mui/material-ui/issues/18331#issuecomment-569981389
const FormikAutocomplete = ({form, field, textFieldProps, ...props}) => {

  const {setTouched, setFieldValue} = form;
  const {name} = field;

  return (
    <Autocomplete
      {...props}
      name={name}
      onChange={(_, value) => setFieldValue(name, value)}
      onBlur={() => setTouched({[name]: true})}
    />
  );
};

export default function FormikDemo() {
  const handleSubmit = useCallback((values, {setSubmitting}) => {
    setTimeout(() => {
      alert(JSON.stringify(values));
      setSubmitting(false);
    }, 400);
  }, []);

  return (
    <Formik
      initialValues={{email: '', firstName: '', lastName: '', job: ''}}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field as={TextField} type="email" name="email" label="Email"/>

        <Field as={TextField} type="text" name="firstName" label="First name"/>

        <Field
          component={FormikAutocomplete}
          name="job"
          options={jobs.map((e) => ({label: e}))}
          isOptionEqualToValue={(value, option) => {
            return value.label === option.label;
          }}
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />

        <Button type="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
}
