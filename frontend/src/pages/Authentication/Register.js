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

async function handleSubmit(values, { setErrors, setStatus, setSubmitting }) {
  console.log(values);
  setSubmitting(false);
}

export const Register = () => {
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
              country: countries.find(({ id }) => id === 'AR'),
              email: '',
              password: '',
              repeatPassword: '',
            }}
            // validationSchema={
            //   Yup.object().shape({
            //     userName: Yup.string().max(30).required('Username is required'),
            //     fullName: Yup.string().max(255).required('Fullname is required'),
            //     birthDate: Yup.date().required('Birthdate is required'),
            //     country: Yup.string().required('Country is required'),
            //     email: Yup.string().email('Must be a valid email').max(255).required(),
            //     password: Yup.string.max(30).required('Password is required'),
            //     repeatPassword: Yup.string.max(30).required('Password is required'),
            //   })
            // }
            onSubmit={handleSubmit}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
              return (
                <Form>
                  <LabeledInput id='userName' label='Username' onChange={handleChange} />
                  <LabeledInput id='fullName' label='Full name' onChange={handleChange} />
                  <LabeledDatePicker
                    id='birthDate'
                    label='Date of birth'
                    datepickerProps={{
                      asSingle: true,
                      useRange: false,
                      displayFormat: 'DD/MM/YYYY',
                    }}
                    value={new Date()}
                    onChange={handleChange}
                  />
                  <DropdownList
                    label='Country'
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
                    id='country'
                    onChange={handleChange}
                  />

                  <div className='mt-10' />

                  <LabeledInput id='email' type='email' label='E-Mail Address' placeholder='Enter your email' />
                  <LabeledInput id='password' type='password' label='Password' placeholder='Enter your password' />
                  <LabeledInput id='repeat-password' type='password' label='Password' placeholder='Repeat your password' />

                  <div className='flex w-full mt-3'>
                    <Button type='submit' onClick={handleSubmit}>
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
