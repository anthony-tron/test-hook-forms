import { useCallback } from 'react';

import { Field, Form, Formik } from 'formik';
import { Autocomplete, Button, MenuItem, Select, TextField } from '@mui/material';
import { countries, jobs, validationSchema } from './common';

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
      initialValues={{email: '', firstName: '', lastName: '', job: undefined, country: countries[0] }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <Field as={TextField} type="email" name="email" label="Email"/>

        <Field as={TextField} type="text" name="firstName" label="First name"/>

        <Field as={TextField} type="text" name="lastName" label="Last name"/>

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

        <Field as={Select} name="country">
          {countries.map((country) => (
            <MenuItem
              key={country}
              value={country}>
              {country}
            </MenuItem>
          ))}
        </Field>

        <Button type="submit">
          Submit
        </Button>
      </Form>
    </Formik>
  );
}
