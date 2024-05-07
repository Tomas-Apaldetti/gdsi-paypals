import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'ui-components/button/Button';
import { Card } from 'ui-components/card/Card';
import { LabeledInput } from 'ui-components/input/LabeledInput';
import { DropdownList } from 'ui-components/input/DropdownList';
import { LabeledDatePicker } from 'ui-components/datepicker/LabeledDatePicker';

import BaseBackground from 'ui-components/layouts/BaseBackground';
import { countries } from 'utils/countries';
import { classNames } from 'utils/classNames';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { formattedDate } from 'utils/dateFormat';
import { password } from './password.yup';

async function handleSubmit(values, { setErrors, setStatus, setSubmitting }) {
  const cpy = { ...values };
  cpy.country = JSON.parse(cpy.country);
  console.log(cpy);
  setSubmitting(false);
}

export const Register = () => {
  const minBirth = new Date();
  minBirth.setFullYear(minBirth.getFullYear() - 13);

  const maxBirth = new Date();
  maxBirth.setFullYear(maxBirth.getFullYear() - 100);

  return (
    <BaseBackground>
      <Card>
        <div className='font-medium self-center text-3xl sm:text-3xl text-slate-700'>Welcome to PayPals</div>

        <div className='mt-10'>
          <Formik
            initialValues={{
              userName: '',
              fullName: '',
              birthDate: formattedDate(new Date()),
              email: '',
              password: '',
              repeatPassword: '',
              country: JSON.stringify(countries.find(({ id }) => id === 'AR')),
            }}
            validationSchema={Yup.object()
              .shape({
                userName: Yup.string().max(30).required('Username is required'),
                fullName: Yup.string().max(255).required('Fullname is required'),
                birthDate: Yup.date()
                  .max(minBirth, `You must be at least 13 years old.`)
                  .min(maxBirth, `You really are 100 years old?`)
                  .required('Birthdate is required'),
                country: Yup.object()
                  .json()
                  .shape({
                    id: Yup.string().required(),
                    name: Yup.string().required(),
                  })
                  .noUnknown(false)
                  .required('Country is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: password(),
                repeatPassword: password()
                  .oneOf([Yup.ref('password'), null], 'Passwords must match'),
              })
              .noUnknown(false)}
            onSubmit={handleSubmit}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => {
              return (
                <Form>
                  <LabeledInput
                    id='userName'
                    label='Username'
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors}
                    touched={touched}
                  />
                  <LabeledInput
                    id='fullName'
                    label='Full name'
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors}
                    touched={touched}
                  />
                  <LabeledDatePicker
                    id='birthDate'
                    label='Date of birth'
                    datepickerProps={{
                      asSingle: true,
                      useRange: false,
                      displayFormat: 'DD/MM/YYYY',
                      minDate: maxBirth,
                      maxDate: minBirth,
                    }}
                    value={minBirth}
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors}
                    touched={touched}
                  />
                  <DropdownList
                    label='Country'
                    id='country'
                    options={countries}
                    renderOption={(option, isSelected, _) => {
                      return (
                        <span className={classNames(isSelected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                          {option.flag} {option.name}
                        </span>
                      );
                    }}
                    renderDisplay={(selected) => {
                      return (
                        <span className='ml-3 block truncate'>
                          {' '}
                          {selected.flag} {selected.name}
                        </span>
                      );
                    }}
                    initial={countries.find(({ id }) => id === 'AR')}
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors}
                    touched={touched}
                  />

                  <div className='mt-10' />

                  <LabeledInput
                    id='email'
                    type='email'
                    label='E-Mail Address'
                    placeholder='Enter your email'
                    handleBlur={handleBlur}
                    onChange={handleChange}
                    error={errors}
                    touched={touched}
                  />
                  <LabeledInput
                    id='password'
                    type='password'
                    label='Password'
                    placeholder='Enter your password'
                    handleBlur={handleBlur}
                    onChange={handleChange}
                    error={errors}
                    touched={touched}
                  />
                  <LabeledInput
                    id='repeatPassword'
                    type='password'
                    label='Password'
                    placeholder='Repeat your password'
                    handleBlur={handleBlur}
                    onChange={handleChange}
                    error={errors}
                    touched={touched}
                  />

                  <div className='flex w-full mt-3'>
                    <Button type='submit' onClick={handleSubmit} disabled={isSubmitting}>
                      <span className='mr-2 text-lg sm:text-md'>Register</span>
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>

        <Link to='/login' className='mt-10 text-sm font-normal text-center'>
          Already have an account?
          <span className='ml-2 font-bold text-purple-500'>Sign In</span>
        </Link>
      </Card>
    </BaseBackground>
  );
};
