import { useCallback } from 'react';

import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
import { Autocomplete, Button, Grid, MenuItem, Select, TextField } from '@mui/material';
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

const FormikTextField = ({ ...props}) => {

  const [field, meta] = useField({ ...props, type: 'text' });

  return (
    <TextField
      name={name}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched ? meta.error : ''}
      {...field}
      {...props}
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
      {({ resetForm }) => (

        <Form>
          <Grid container item gap={2} md={8}>
            <FormikTextField
              type="email"
              name="email"
              label="Email"
              fullWidth
              required
            />

            <FormikTextField
              type="text"
              name="firstName"
              label="First name"
              fullWidth
              required
            />

            <FormikTextField
              type="text"
              name="lastName"
              label="Last name"
              fullWidth
              required
            />

            <Field
              component={FormikAutocomplete}
              name="job"
              options={jobs.map((e) => ({label: e}))}
              isOptionEqualToValue={(value, option) => {
                return value.label === option.label;
              }}
              renderInput={(params) => (
                <TextField label="Job" required {...params} />
              )}
              fullWidth
            />

            <Field
              as={Select}
              name="country"
              fullWidth
            >
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

            <Button color="secondary" onClick={() => resetForm()}>
              Reset to default values
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
