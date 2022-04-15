import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { countries, jobs, validationSchema } from './common';

// Thank you! https://react-hook-form.com/advanced-usage#CustomHookwithResolver
const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
);

const useFormError = (errors) => (fieldName) => ({
  error: !!errors[fieldName],
  helperText: errors[fieldName]?.message,
});

export default function ReactHookFormDemo() {

  const resolver = useYupValidationResolver(validationSchema);

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: countries[0],
      job: null,
    },
    resolver,
  });

  const getError = useFormError(errors);

  const submit = useCallback((values) => {
    setTimeout(() => {
      alert(JSON.stringify(values));
    }, 400);
  }, []);

  return (
    <form onSubmit={handleSubmit((submit))}>
      <Grid container item gap={2} md={8}>
        <TextField
          required
          fullWidth
          label="Email"
          type="email"
          {...getError('email')}
          {...register('email')}
        />

        <TextField
          required
          fullWidth
          label="First name"
          {...getError('firstName')}
          {...register('firstName')}
        />

        <TextField
          required
          fullWidth
          label="Last name"
          {...getError('lastName')}
          {...register('lastName')}
        />

        <Controller
          control={control}
          name="job"
          render={({ field }) => (
            <Autocomplete
              fullWidth
              value={field.value}
              onChange={(_, item) => field.onChange(item)}
              options={jobs.map((e) => ({label: e}))}
              isOptionEqualToValue={(value, option) => {
                return value.label === option.label;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Job"
                  {...getError('job')}
                />
              )}
            />
          )}
        />

        <Controller
          control={control}
          name="country"
          render={({ field }) => (
            <Select fullWidth {...field}>
              {countries.map((country) => (
                <MenuItem
                  key={country}
                  value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          )}
          />

        <Button type="submit">
          Submit
        </Button>

        <Button color="secondary" onClick={() => reset()}>
          Reset to default values
        </Button>
      </Grid>
    </form>
  );
}
