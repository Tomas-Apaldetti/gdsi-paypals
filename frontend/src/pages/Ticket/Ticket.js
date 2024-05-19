import React from 'react';
export const Ticket = ({ ticket }) => {
  return (
    <div className='flex mx-4 my-2 bg-slate-50 shadow-sm rounded-sm h-24 hover:shadow-md hover:shadow-purple-100 transition'>
      <div className='w-full p-2 flex justify-between'>
        <div className='max-w-72 overflow-clip text-ellipsis mr-10'>
          <h2 className='text-lg font-medium text-slate-800 tracking-normal'>{ticket.name}</h2>
          <p className='text-sm text-slate-400 text-ellipsis'>{ticket.comment}</p>
        </div>

        <div className='grow'>
          <div className='text-slate-800 font-bold uppercase text-end text-4xl'>
            <span className='text-purple-500 pr-1'>{`$${ticket.amount}`}</span>
            <span className='font-normal text-slate-500'>/</span>
            <span className='text-green-500 pl-1'>
              {`$${ticket.payments ? ticket.payments.reduce((acc, payment) => {
                return acc + payment.amount;
              }, 0) : 0}`}
            </span>
          </div>
          <div className='flex w-full h-full flex-row-reverse gap-1 pt-2'>
            {ticket.debtors.map((debtor) => (
              <UserTag
                key={debtor._id}
                name={debtor.username}
                amount={debtor.amount}
                paid={ticket.payments ?
                  ticket.payments
                  .filter((payment) => payment.from.id === debtor.id)
                  .reduce((acc, payment) => payment.amount + acc, 0)
                  : 0
                }
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
