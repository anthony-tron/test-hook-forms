import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Autocomplete, Button, MenuItem, Select, TextField } from '@mui/material';
import { countries, jobs } from './common';

export default function ReactHookFormDemo() {

  const { register, handleSubmit } = useForm({
    defaultValues: {
      // only works for TextInput and native HTML inputs
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
    },
  });

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

      <Autocomplete
        name="job"
        options={jobs.map((e) => ({label: e}))}
        isOptionEqualToValue={(value, option) => {
          return value.label === option.label;
        }}
        renderInput={(params) => (
          <TextField {...params} label="Job" {...register('job')} />
        )}
        defaultValue={{ label: jobs[0] }}
      />

      <Select name="country" defaultValue={countries[0]} {...register('country')}>
        {countries.map((country) => (
          <MenuItem
            key={country}
            value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>

      <Button type="submit">
        Submit
      </Button>
    </form>
  );
}
