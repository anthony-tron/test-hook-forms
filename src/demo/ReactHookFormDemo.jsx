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

  console.debug({ errors })

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
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
      />

      <TextField
        required
        label="First name"
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        {...register('firstName')}
      />

      <TextField
        required
        label="Last name"
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
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
                error={!!errors.job}
                helperText={errors.job && 'required field'}
                label="Job"
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
