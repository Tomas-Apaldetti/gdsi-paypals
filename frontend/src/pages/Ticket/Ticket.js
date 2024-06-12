import React, { useState } from 'react';
import { Modal } from 'ui-components/modal/Modal';
import { TicketDetail } from './Detail';
import { TicketCreation } from './Creation';
import { user } from 'utils/auth';
import Button from 'ui-components/button/Button';
import { BanknotesIcon } from '@heroicons/react/20/solid';
import { PaymentDetails } from './Payments';
export const Ticket = ({ ticket, onClick = '', onEdition }) => {
  const [showView, setShowView] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const userId = user().sub;
  return (
    <>
      <Modal open={showView} setOpen={setShowView} onClose={() => setShowView(false)}>
        {userId === ticket.creator ? (
          <TicketCreation
            ticket={ticket}
            onSuccesfullSubmit={(respBody) => {
              onEdition && onEdition(respBody);
              setShowView(false);
            }}
            onCancel={() => setShowView(false)}
          />
        ) : (
          <TicketDetail ticket={ticket} />
        )}
      </Modal>

      <Modal open={showPayment} setOpen={setShowPayment} onClose={() => setShowPayment(false)}>
        <div className='mt-10 max-h-96'>
          <PaymentDetails
            ticketId={ticket._id}
            ticketCreator={ticket.creator}
            debtors={ticket.debtors}
            payments={ticket.payments}
            waivers={ticket.waivers}
            onPayment={()=>{setShowPayment(false); onEdition()}}
          />
        </div>
      </Modal>

      <div
        onClick={() => setShowView(true)}
        className='flex mx-2 px-2 my-2 bg-slate-100 shadow-sm rounded-sm hover:shadow-md hover:shadow-purple-100 transition cursor-pointer'
      >
        <div className='w-full p-2 flex justify-between'>
          <div className='max-w-72 overflow-clip text-ellipsis mr-10 grow'>
            <h2 className='text-lg font-medium text-slate-800 tracking-normal'>{ticket.name}</h2>
            <p className='text-sm tracking-tighter font-light text-slate-500 text-ellipsis'>{ticket.comment}</p>
          </div>

          <div className='max-w-52 overflow-hidden'>
            <div className='flex flex-col items-end pr-2'>
              <span className='text-slate-600 font-bold text-3xl'>{`$${ticket.amount}`}</span>
              <div className='flex flex-row items-end gap-2 py-1'>
                <span className='text-slate-600 text-sm font-medium'>
                  <p>
                    Total:{' '}
                    <span className='text-purple-500 font-extrabold tracking-wide'>
                      $
                      {ticket.payments?.reduce((acc, payment) => {
                        return acc + payment.amount;
                      }, 0) || 0}
                    </span>
                  </p>
                </span>
                <span className='text-slate-600 text-sm font-medium'>
                  <p>
                    You:{' '}
                    <span className='text-purple-500 font-extrabold tracking-wide'>
                      $
                      {ticket.payments?.reduce((acc, payment) => {
                        if (payment.from._id === user().sub) {
                          return acc;
                        }
                        return acc + payment.amount;
                      }, 0) || 0}
                    </span>
                  </p>
                </span>
              </div>
              <Button
                secondary
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPayment(true);
                }}
              >
                <span className='flex items-center'>
                  <p className='px-2 font-bold'>Payments</p>
                  <BanknotesIcon className='h-4 w-4 mx-2' />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
