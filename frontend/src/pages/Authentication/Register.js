import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useAuth } from 'context/AuthContextProvider';
import { register } from 'services/auth';
import { AtSymbolIcon, FingerPrintIcon, KeyIcon, UserIcon } from '@heroicons/react/20/solid';

export const Register = () => {
  const minBirth = new Date();
  minBirth.setFullYear(minBirth.getFullYear() - 13);

  const maxBirth = new Date();
  maxBirth.setFullYear(maxBirth.getFullYear() - 100);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    const cpy = {
      ...values,
      country: JSON.parse(values.country).id,
      repeatPassword: undefined,
    };
    try {
      const response = await register(cpy);
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
      }
      const body = await response.json();
      auth.login(body.tokens);
      navigate('/');
    } catch (e) {
      setStatus(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BaseBackground>
      <Card>
        <div className='font-bold self-center text-3xl sm:text-3xl text-slate-700'>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-500">Welcome!</span>
        </div>
        <div className='mt-4 self-center text-xl text-center sm:text-sm text-slate-700'>
          Enter your data to create your account
        </div>
        <div className='mt-5'>
          <Formik
            initialValues={{
              username: '',
              fullName: '',
              birthDate: formattedDate(new Date()),
              email: '',
              password: '',
              repeatPassword: '',
              country: JSON.stringify(countries.find(({ id }) => id === 'AR')),
            }}
            validationSchema={Yup.object()
              .shape({
                username: Yup.string().max(30).required('Username is required'),
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
                repeatPassword: password().oneOf([Yup.ref('password'), null], 'Passwords must match'),
              })
              .noUnknown(false)}
            onSubmit={handleSubmit}
          >
            {({ errors, status, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => {
              return (
                <Form>
                  <p className='text-md font-semibold text-red-400 text-center'>{status}</p>
                  <LabeledInput
                    icon={<UserIcon />}
                    id='username'
                    label='Username'
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors}
                    touched={touched}
                  />
                  <LabeledInput
                    icon={<FingerPrintIcon />}
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

                  <div className='mt-3' />

                  <LabeledInput
                    icon={<AtSymbolIcon />}
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
                    icon={<KeyIcon />}
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
                    icon={<KeyIcon />}
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
                      <span className='mr-2 font-semibold text-lg sm:text-md'>Register</span>
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>

        <Link to='/login' className='mt-10 text-sm font-normal text-center'>
          Already have an account?
          <span className='ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-600'>Sign In</span>
        </Link>
      </Card>
    </BaseBackground>
  );
};
