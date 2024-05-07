import * as Yup from 'yup';

export const password = () =>
  Yup.string()
    .min(8, 'The password must be at least 8 characters long')
    .max(30, 'The password must be at most 30 characters long')
    .required('Password is required');
