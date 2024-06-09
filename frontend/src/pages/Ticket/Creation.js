import { React, useState } from 'react';
import { LabeledInput } from 'ui-components/input/LabeledInput';
import Button from 'ui-components/button/Button';
import { classNames } from 'utils/classNames';
import { DropdownList } from 'ui-components/input/DropdownList';
import { categories } from 'utils/categories';
import { ticketCreate, ticketEdit } from 'services/tickets';
import { Form, Formik } from 'formik';
import { CurrencyDollarIcon, TagIcon } from '@heroicons/react/20/solid';
import * as Yup from 'yup';
import { DebtorList } from './DebtorList';
import { useSearchParams } from 'react-router-dom';
import { getGroupMembers, getSelfAsDebtor } from 'services/groups';
import { useAPIData } from 'hooks/useAPIData';
import { Loading } from 'logic-components/Loading';

export const TicketCreation = ({ onCancel, onSuccesfullSubmit, ticket = null }) => {
  const defaultCategory = categories.find(({ id }) => id === (ticket?.category || 'home'));
  const debtorMyself = getSelfAsDebtor();
  const [queryparams] = useSearchParams();
  const [selectedButton, setSelectedButton] = useState(!ticket ? 1 : (ticket?.split_type == "FIXED" ? 0 : ticket?.split_type == "EQUALLY" ? 1 : 2 )); //Default: Equally

  const { data: possibleDebtors, loading } = useAPIData(
    async () => await getGroupMembers(queryparams.get('group')),
    debtorMyself,
    debtorMyself,
  );

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    console.log(JSON.parse(values.debtors));
    console.log(values.amount)

    let total = 0;
    JSON.parse(values.debtors).forEach(debtor => {
      total += debtor.amount;
    });

    if (total < values.amount) {
      setStatus(`Debtors's payments are less in total than the amount. Increase payments!`);
      setSubmitting(false);
      return;
    } else if (total > values.amount) {
      setStatus(`Debtors's payments are greater in total than the amount. Decrease payments!`);
      setSubmitting(false);
      return;
    } 

    try {
      const response = await (ticket ? ticketEdit : ticketCreate)(
        {
          ...values,
          debtors: JSON.parse(values.debtors).map((debtor, _i, arr) => {
            console.log('debtor amount', debtor.amount)
            console.log('values amount', values.amount)
            console.log('total amount', parseFloat(((debtor.amount / 100) * values.amount).toFixed(2)))
            return {
              _id: debtor.id,
              cut: selectedButton == 1 ? parseFloat((values.amount / JSON.parse(values.debtors).length).toFixed(2)) : debtor.amount
            };
          }),
          category: JSON.parse(values.category).id,
          split_type: selectedButton === 0 ? 'FIXED' : selectedButton == 1 ? 'EQUALLY' : 'PERCENTAGE',
        },
        queryparams.get('group'),
        ticket?._id
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
    <Loading loading={loading}>
      <Formik
        initialValues={{
          name: ticket?.name || '',
          amount: ticket?.amount || 0,
          category: JSON.stringify(defaultCategory),
          debtors: JSON.stringify(ticket?.debtors?.map(debtor => ({ ...debtor, id: debtor._id }))) || JSON.stringify(possibleDebtors),
          comment: ticket?.comment || '',
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
        {({ errors, status, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
          return (
            <Form className='max-h-full w-92 sm:w-112 md:w-128 flex flex-col justify-center px-4 pb-4 transition'>
              <p className='text-md font-semibold text-red-400 text-center'>{status}</p>
              <LabeledInput
                icon={<TagIcon />}
                id='name'
                placeholder='Ticket Name'
                label='Name'
                onChange={handleChange}
                error={errors}
                touched={touched}
                handleBlur={handleBlur}
                defaultValue={values.name}
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
                defaultValue={values.amount}
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
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors}
                touched={touched}
              />

              <Loading loading={loading}>
                <DebtorList
                  options={possibleDebtors}
                  initial={JSON.parse(values.debtors)}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  onButtonSelectionChange={setSelectedButton}
                  selectedButton={selectedButton}
                  error={errors}
                  touched={touched}
                  ticketAmount={values.amount}
                />
              </Loading>

              <LabeledInput
                id='comment'
                label='Comment'
                textarea
                placeholder='Enter your comment'
                onChange={handleChange}
                error={errors}
                touched={touched}
                handleBlur={handleBlur}
                defaultValue={values.comment}
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
                    <span className='text-md font-semibold tracking-wider'>Save</span>
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Loading>
  );
};
