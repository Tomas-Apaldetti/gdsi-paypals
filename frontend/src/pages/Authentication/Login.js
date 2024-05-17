import React from 'react';
import Button from 'ui-components/button/Button';
import { Card } from 'ui-components/card/Card';
import { LabeledInput } from 'ui-components/input/LabeledInput';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import BaseBackground from 'ui-components/layouts/BaseBackground';
import { Form, Formik } from 'formik';
import { password } from './password.yup';
import { login } from 'services/auth';
import { useAuth } from 'context/AuthContextProvider';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/20/solid';

export const Login = () => {

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    try{
      const response = await login(values);
      if(!response.ok){
        const body = await response.json();
        throw new Error(body.message);
      }
      const body = await response.json();
      auth.login(body.tokens);
      navigate('/');
    }catch(e){
      setStatus(e.message)
    }finally{
      setSubmitting(false)
    }
  }

  return (
    <BaseBackground>
      <Card>
        <div className='font-medium self-center text-3xl sm:text-3xl text-slate-700'>Welcome Back</div>
        <div className='mt-4 self-center text-xl text-center sm:text-sm text-slate-700'>
          Enter your credentials to access your account
        </div>

        <div className='mt-10'>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: password(),
            })}
            onSubmit={handleSubmit}
          >
            {({ errors, status, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => {
              return (
                <Form>
                  <p className='text-md font-semibold text-red-400 text-center'>{status}</p>
                  <LabeledInput
                    icon={<AtSymbolIcon />}
                    id='email'
                    type='email'
                    label='E-Mail Address'
                    placeholder='Enter your email'
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors}
                    touched={touched}
                  />
                  <LabeledInput
                    icon={<KeyIcon />}
                    id='password'
                    type='password'
                    label='Password'
                    placeholder='Enter your password'
                    onChange={handleChange}
                    handleBlur={handleBlur}
                    error={errors}
                    touched={touched}
                  />

                  <div className='flex w-full mt-3'>
                    <Button type='submit' onClick={handleSubmit} disabled={isSubmitting}>
                      <span className='mr-2 text-lg sm:text-md'>Sign In</span>
                      <span>
                        <svg
                          className='h-6 w-6'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                      </span>
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>

        <Link to='/register' className='mt-10 text-sm font-normal text-center'>
          Don't have an account yet?
          <span className='ml-2 font-bold text-purple-500'>Register Now</span>
        </Link>
      </Card>
    </BaseBackground>
  );
};
