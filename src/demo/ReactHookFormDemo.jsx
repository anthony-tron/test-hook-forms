import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Button, MenuItem, Select, TextField } from '@mui/material';
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

  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      country: countries[0],
      job: {
        label: jobs[0],
      },
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
      <TextField
        required
        label="Email"
        type="email"
        {...getError('email')}
        {...register('email')}
      />

      <TextField
        required
        label="First name"
        {...getError('firstName')}
        {...register('firstName')}
      />

      <TextField
        required
        label="Last name"
        {...getError('lastName')}
        {...register('lastName')}
      />

      <Controller
        control={control}
        name="job"
        render={({ field }) => (
          <Autocomplete
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
          <Select {...field}>
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
    </form>
  );
}
