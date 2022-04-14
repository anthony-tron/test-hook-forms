import { object, string } from 'yup';

export const jobs = [
  'Developer',
  'Manager',
  'Lawyer',
  'Student',
  'Professor',
];

export const countries = [
  'India',
  'China',
  'Japan',
];

export const validationSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  job: object().shape({
    label: string().required()
  }).required(),
  country: string().required(),
});
