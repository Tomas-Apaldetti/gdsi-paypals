import { BanknotesIcon, ChevronRightIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { Tooltip } from '@mui/material';
import { Modal } from 'ui-components/modal/Modal';
import Button from 'ui-components/button/Button';
import { user } from 'utils/auth';
import { useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { LabeledInput } from 'ui-components/input/LabeledInput';
import { useSearchParams } from 'react-router-dom';
import { payTicket, waiveTicket } from 'services/tickets';

export const PaymentDetails = ({ ticketCreator, ticketId, debtors = [], payments = [], waivers = [], onPayment }) => {
  return (
    <>
      {debtors.map((debtor, i) => (
        <PaymentDetail
          key={i}
          ticketCreator={ticketCreator}
          ticketId={ticketId}
          debtor={debtor}
          payments={payments.filter((p) => p.from._id === debtor._id)}
          waivers={waivers.filter((w) => w.to._id === debtor._id)}
          onPayment={onPayment}
        />
      ))}
    </>
  );
};

const PaymentDetail = ({ ticketCreator, ticketId, debtor, payments = [], waivers = [], onPayment }) => {
  const [showPayment, setShowPayment] = useState(null);

  const together = payments
    .map((p) => ({ ...p, type: 'PAYMENT' }))
    .concat(waivers.map((w) => ({ ...w, type: 'WAIVER' })))
    .map((t) => ({ ...t, onDate: new Date(t.onDate) }))
    .sort((a, b) => a.onDate - b.onDate);

  const amountPaid = payments.reduce((acc, p) => acc + p.amount, 0);
  const hasWaiver = waivers.length > 0;

  return (
    <>
      <Modal onClose={() => setShowPayment(null)} open={!!showPayment} setOpen={() => {}}>
        <PaymentScreen
          ticketId={ticketId}
          isWaiver={showPayment === 'WAIVE'}
          maxPayment={debtor.amount - amountPaid}
          debtor={debtor._id}
          onSuccess={() => {setShowPayment(null); onPayment()}}
        />
      </Modal>
      <div className='px-4 border-l-2 border-purple-500 mt-4 flex'>
        <div className='grow mr-4'>
          <p className='text-md text-slate-600 tracking-tight font-medium'>
            {`${debtor.username} paid $${amountPaid} of $${debtor.amount}.`}
            {hasWaiver && 'The amount was waived'}
          </p>
          <ol>
            {together.map((t) => (
              <li className='px-4 flex items-center'>
                <ChevronRightIcon className='h-4 w-4 text-purple-500 flex-shrink-0'></ChevronRightIcon>
                <p className='text-slate-600 tracking-tight font-light'>
                  {t.type === 'PAYMENT'
                    ? `${t.onDate.toDateString()} : A payment of $${t.amount} was made`
                    : `${t.onDate.toDateString()} : ${t.from.username} waived the debt`}
                </p>

                {t.note && (
                  <Tooltip title={t.note}>
                    <span className='px-2'>
                      <InformationCircleIcon className='text-slate-500 h-4 w-4 transition hover:text-purple-500' />
                    </span>
                  </Tooltip>
                )}
              </li>
            ))}
          </ol>
        </div>
        <div className='flex flex-col gap-1 justify-end'>
          {ticketCreator === user().sub && !hasWaiver && amountPaid < debtor.amount && (
            <Button secondary className='py-1' onClick={() => setShowPayment('WAIVE')}>
              <span className='px-2 text-sm font-bold tracking-wider'>Waive</span>
            </Button>
          )}
          {debtor._id === user().sub && !hasWaiver && amountPaid < debtor.amount && (
            <Button className='py-1' onClick={() => setShowPayment('PAY')}>
              <span className='px-2 text-sm font-bold tracking-wider'>Pay</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

const PaymentScreen = ({ ticketId, isWaiver, debtor, maxPayment, onSuccess }) => {
  const [queryparams] = useSearchParams();
  const group = queryparams.get('group');

  let amountValidator = Yup.number().min(0.01, 'The amount must be positive greater than 1 cent');
  if (isWaiver) {
    amountValidator = amountValidator.required();
  }

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    const f = isWaiver ? waiveTicket : payTicket;
    if(isWaiver){
      delete values.amount
      values["for"] = debtor
    }
    try{
      const response = await f(group, ticketId, values);
      if(!response.ok){
        const json = await response.json();
        throw new Error(json.message)
      }
      setSubmitting(false);
      onSuccess();
    }catch(e){
      setStatus(e.message)
    }
  };

  return (
    <div className='max-h-96 w-96 mx-4 my-4'>
      <Formik
        initialValues={{
          amount: maxPayment,
          note: '',
        }}
        validationSchema={Yup.object().shape({
          amount: amountValidator,
          note: Yup.string().max(255, "The note can't be more than 255 characters"),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, status, handleBlur, handleChange, handleSubmit, isSubmitting, touched }) => {
          return (
            <Form>
              <p className='text-md font-semibold text-red-400 text-center'>{status}</p>
              {!isWaiver && (
                <LabeledInput
                  icon={<BanknotesIcon />}
                  type='number'
                  id='amount'
                  label='Amount to pay'
                  defaultValue={maxPayment}
                  placeholder='The amount to pay'
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors}
                  touched={touched}
                />
              )}

              <LabeledInput
                id='note'
                type='note'
                label='Note'
                textarea
                placeholder='Write a note if needed'
                onChange={handleChange}
                handleBlur={handleBlur}
                error={errors}
                touched={touched}
              />

              <div className='flex w-full mt-3'>
                <Button type='submit' onClick={handleSubmit} disabled={isSubmitting} className='py-2'>
                  <span className='mr-2 font-semibold text-lg sm:text-md'>{isWaiver ? 'Waive' : 'Pay'}</span>
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
