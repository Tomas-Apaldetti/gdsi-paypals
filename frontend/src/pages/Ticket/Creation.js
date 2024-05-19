import React, { useEffect, useState } from 'react';
import { LabeledInput } from 'ui-components/input/LabeledInput';
import Button from 'ui-components/button/Button';
import { classNames } from 'utils/classNames';
import { DropdownList } from 'ui-components/input/DropdownList';
import { categories } from 'utils/categories';
import { ticketCreate } from 'services/tickets';
import { Form, Formik } from 'formik';
import { CurrencyDollarIcon, TagIcon } from '@heroicons/react/20/solid';
import * as Yup from 'yup';
import { DebtorList } from './DebtorList';
import { groupUsers } from './groupUsers.test.data';
import { useSearchParams } from 'react-router-dom';
import { getGroupMembers, getSelfAsDebtor } from 'services/groups';

Yup.addMethod(Yup.string, 'jsonArray', function (message) {
  return this.test('jsonArray', message, function (value) {
    const { path, createError } = this;
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return true;
      }
      if (parsed.length === 0) {
        return createError({ path, message: message || 'There must be at least one item' });
      }
      return createError({ path, message: message || 'The field must be a valid JSON array' });
    } catch (err) {
      return createError({ path, message: message || 'The field must be a valid JSON' });
    }
  });
});

export const TicketCreation = ({ onCancel, onSuccesfullSubmit }) => {
  const defaultCategory = categories.find(({ id }) => id === 'home');
  const defaultDebtors = groupUsers;

  const [queryparams,] = useSearchParams();
  const [possibleDebtors, setPossibleDebtors] = useState([]);

  useEffect(() => {
    (async() => {
      if(setPossibleDebtors.length === 0) return;
      try{
        setPossibleDebtors(await getGroupMembers(queryparams.get('group')));

      }catch(e){
        setPossibleDebtors(getSelfAsDebtor())
      }
    })();
  }, [possibleDebtors, queryparams])

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      const response = await ticketCreate(
        {
          ...values,
          debtors: JSON.parse(values.debtors).map((debtor) => debtor._id),
          category: JSON.parse(values.category).id,
          split_type: 'PERCENTAGE',
        },
        queryparams.get('group'),
      );

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message);
      }

      const body = await response.json();
      onSuccesfullSubmit(body);

    } catch (e) {
      setStatus(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        amount: 0,
        category: JSON.stringify(defaultCategory),
        debtors: JSON.stringify(defaultDebtors),
        comment: '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('A ticket name is required'),
        amount: Yup.number().min(0.01, 'The amount must be a positive amount').required('An amount is required'),
        category: Yup.object()
          .json()
          .shape({
            id: Yup.string()
              .oneOf(categories.map((c) => c.id))
              .required(),
          }),
        comment: Yup.string().max(255, 'The comment must be less than 255 chars'),
        debtors: Yup.string().jsonArray('There must be at least one debtor'),
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => {
        return (
          <Form className='max-h-full w-92 sm:w-112 md:w-128 flex flex-col justify-center px-4 pb-4 transition'>
            <LabeledInput
              icon={<TagIcon />}
              id='name'
              placeholder='Ticket Name'
              label='Name'
              onChange={handleChange}
              error={errors}
              touched={touched}
              handleBlur={handleBlur}
            />

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
              initial={defaultCategory}
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

            <DebtorList
              options={groupUsers}
              defaultSelected={groupUsers}
              onChange={handleChange}
              handleBlur={handleBlur}
              error={errors}
              touched={touched}
            />

            <LabeledInput
              id='comment'
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
