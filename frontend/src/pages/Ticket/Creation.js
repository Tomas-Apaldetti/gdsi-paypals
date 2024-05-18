import React from 'react';
import { LabeledInput } from 'ui-components/input/LabeledInput';
import Button from 'ui-components/button/Button';
import { classNames } from 'utils/classNames';
import { DropdownList } from 'ui-components/input/DropdownList';
import { categories } from 'utils/categories';
import { debtors } from 'utils/debtors';
import { ticketCreate } from 'services/tickets';

import { Form, Formik } from 'formik';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';

const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
  const ticket = {
    amount: values.amount,
    debtor: JSON.parse(values.debtor).id,
    category: JSON.parse(values.category).id,
    comments: values.comments,
  };

  await ticketCreate(ticket);

  setSubmitting(false);
};

export const TicketCreation = ({ onCancel }) => {
  return (
    <Formik
      initialValues={{
        amount: 0,
        category: '',
        debtor: '',
        comments: '',
      }}
      // validationSchema={
      //   Yup.object().shape({
      //     email: Yup.string().email('Must be a valid email').max(255).required(),
      //     password: Yup.string.max(30).required('Password is required'),
      //   })
      // }
      onSubmit={handleSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => {
        return (
          <Form className='h-full w-92 sm:w-112 md:w-128 flex flex-col justify-center px-4 pb-4'>

            <LabeledInput
              icon={<CurrencyDollarIcon />}
              id='amount'
              type='number'
              step='0.01'
              placeholder='0.00'
              label='Amount'
              onChange={handleChange}
              error={errors}
              touched={touched}
              handleBlur={handleBlur}
            />

            <DropdownList
              id='category'
              label='Category'
              options={categories}
              initial={categories.find(({ id }) => id === 'home')}
              renderOption={(option, isSelected, _) => {
                return (
                  <span className={classNames(isSelected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                    {option.emoji} {option.name}
                  </span>
                );
              }}
              renderDisplay={(selected) => {
                return (
                  <span className='ml-3 block truncate'>
                    {' '}
                    {selected.emoji} {selected.name}
                  </span>
                );
              }}
            />

            <DropdownList
              id='debtor'
              label='Debtor'
              options={debtors}
              onChange={handleChange}
              error={errors}
              touched={touched}
              handleBlur={handleBlur}
              initial={debtors.find(({ id }) => id === 'lu')}
              renderOption={(option, isSelected, _) => {
                return (
                  <span className={classNames(isSelected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                    {option.name}
                  </span>
                );
              }}
              renderDisplay={(selected) => {
                return <span className='ml-3 block truncate'> {selected.name}</span>;
              }}
            />

            <LabeledInput
              id='comments'
              label='Comment'
              textarea
              placeholder='Enter your comment'
              onChange={handleChange}
              error={errors}
              touched={touched}
              handleBlur={handleBlur}
            />

            <div className='flex pt-10'>
              <div className='w-full'></div>

              <div className='w-full px-4'>
                <Button secondary type='cancel' onClick={onCancel} disabled={isSubmitting}>
                  <span className='text-md font-semibold tracking-wider'>Cancel</span>
                </Button>
              </div>

              <div className='w-full pl-4'>
                <Button type='submit' onClick={handleSubmit} disabled={isSubmitting}>
                  <span className='text-md font-semibold tracking-wider'>Create</span>
                </Button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
