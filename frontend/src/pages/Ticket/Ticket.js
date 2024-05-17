import React from 'react';
import { getCurrencySymbol } from 'utils/currencySymbol';
export const Ticket = ({ ticket }) => {
  return (
    <div className='flex mx-4 my-2 bg-slate-50 shadow-sm rounded-sm h-24 hover:shadow-md hover:shadow-purple-100 transition'>
      <div className='w-full p-2 flex justify-between'>
        <div className='max-w-72 overflow-clip text-ellipsis mr-10'>
          <h2 className='text-lg font-medium text-slate-800 tracking-normal'>{ticket.name}</h2>
          <p className='text-sm text-slate-400 text-ellipsis'>{ticket.description}</p>
        </div>

        <div className='grow'>
          <div className='text-slate-800 font-bold uppercase text-end'>
            <span className='text-purple-500 pr-1'>{`${getCurrencySymbol(ticket.value.converted.currency)}${ticket.value.converted.amount}`}</span>
            /
            <span className='text-green-500 pl-1'>
              {`${getCurrencySymbol(ticket.value.converted.currency)}${ticket.payments.reduce((acc, payment) => {
                console.log(payment);
                return acc + payment.amount.amount;
              }, 0)}`}
            </span>
          </div>
          <div className='flex w-full h-full flex-row-reverse gap-1 pt-1'>
            {ticket.debtors.map((debtor) => (
              <UserTag
                key={debtor.id}
                name={debtor.name}
                amount={debtor.amount.amount}
                paid={ticket.payments
                  .filter((payment) => payment.from.id === debtor.id)
                  .reduce((acc, payment) => payment.amount.amount + acc, 0)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const UserTag = ({ name, amount, paid }) => {
  let border;
  if (paid === 0) {
    border = 'border-red-200';
  } else if (amount > paid) {
    border = 'border-yellow-200';
  } else {
    border = 'border-green-200';
  }

  return (
    <div
      className={`
      text-xs
      text-slate-500
       border-2 ${border}
       font-normal
       uppercase
       w-fit
       h-fit
       rounded-lg
       py-0.5
       px-1
      `}
    >
      {name}
    </div>
  );
};
