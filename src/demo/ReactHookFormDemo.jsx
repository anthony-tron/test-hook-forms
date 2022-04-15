import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Button, MenuItem, Select, TextField } from '@mui/material';
import { countries, jobs, validationSchema } from './common';

const yupResolver = (validationSchema) => async (data, context, options) => {
  let values = {};
  let errors = {};

  try {
    console.debug({ data, context, options });
    values = await validationSchema.validate(data);
  } catch (exceptions) {
    errors = exceptions;
  }

  return {
    values,
    errors,
  };
};

export default function ReactHookFormDemo() {

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
    resolver: yupResolver(validationSchema),
  });

  console.debug({ errors })

  const submit = useCallback((values) => {
    setTimeout(() => {
      alert(JSON.stringify(values));
    }, 400);
  }, []);

  return (
    <form onSubmit={handleSubmit((submit))}>
      <TextField label="Email" type="email" {...register('email')} />

      <TextField label="First name" {...register('firstName')} />

      <TextField label="Last name" {...register('lastName')} />

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
              <TextField {...params} label="Job" />
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
