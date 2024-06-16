import Tooltip from '@mui/material/Tooltip';
import { getTicketsDissagg, getTotalDebtForUser, getTotalPaidForUser, getUniqueDebtors, hasWaiverFor } from './utils';
import { Disclosure, Transition } from '@headlessui/react';
import { useState } from 'react';
import { UserIcon } from '@heroicons/react/20/solid';
import { user } from 'utils/auth';

const UserBalanceSummary = ({ username, totalOwed, totalPaid, ticketsInvolved }) => {
  const t = totalPaid - totalOwed;
  return (
    <Disclosure as='div' className='flex flex-col w-full justify-between my-2 px-2 transition border-l-2 border-purple-500'>
      <Disclosure.Button className='flex w-full justify-between'>
        <Tooltip title={username}>
          <p className='max-w-28 lg:max-w-40 overflow-hidden text-ellipsis font-bold text-slate-900 tracking-tight'>
            {username}
          </p>
        </Tooltip>
        <p className={`font-bold tracking-tight ${t < 0 ? 'text-red-500' : 'text-green-500'}`}>${t < 0 ? Math.abs(t) : 0}</p>
      </Disclosure.Button>

      <Transition
        enter='transition duration-200 ease-out'
        enterFrom='transform -translate-y-full scale-0 opacity-0'
        enterTo='transform translate-y-0 scale-95 opacity-100'
        leave='transition duration-200 ease-out'
        leaveFrom='transform translate-y-0 scale-95 opacity-10'
        leaveTo='transform -translate-y-full scale-0 opacity-0'
      >
        <Disclosure.Panel as='ul' className='text-slate-800 font-thin tracking-tight px-2'>
          {ticketsInvolved.map((ticket) => (
            <li><span className='font-medium'>{`${ticket.name}`}</span>{`: $${ticket.paid} out of $${ticket.toPay}`}</li>
          ))}
        </Disclosure.Panel>
      </Transition>
    </Disclosure>
  );
};

const MovementSummary = ({ history }) => {
  console.log(history);
  return (
    <ul className='font-thin tracking-tight text-sm text-slate-800'>
      {history
        .sort((a, b) => a.onDate - b.onDate)
        .map((h) => {
          const title = `${new Date(h.onDate).toDateString()} - ${h.ticketName}`;
          const description = h.to ? `${h.from.username} waived the debt to ${h.to.username}` : `${h.from.username} paid $${h.amount}`
          return (
            <li className='flex flex-col px-2 my-2 border-l border-purple-500'>
              <span className='font-medium'>{title}</span>
              <span>{description}</span>
            </li>
          );
        })}
    </ul>
  );
};

const Balance = ({ tickets }) => {
  const uniqueDebtors = getUniqueDebtors(tickets);
  const [onlySelf, setOnlySelf] = useState(false);
  const me = user().sub;

  return (
    <>
      <span className='flex justify-between mx-2 px-2 pt-2 pb-2 border-b border-purple-500'>
        <h2 className='text-lg text-slate-800 font-medium'>Outstanding Debts</h2>
      </span>
      <div className='mx-2 pt-2 px-2 transition'>
        {uniqueDebtors.map((u) => {
          const unwaived = tickets.filter((t) => !hasWaiverFor(t, u));

          return (
            <UserBalanceSummary
              username={u.username}
              totalOwed={getTotalDebtForUser(unwaived, u)}
              totalPaid={getTotalPaidForUser(unwaived, u)}
              ticketsInvolved={getTicketsDissagg(unwaived, u)}
            />
          );
        })}
      </div>

      <span className='flex justify-between mx-2 px-2 pt-2 pb-2 border-b border-purple-500'>
        <h2 className='text-lg text-slate-800 font-medium'>Movements</h2>
        <button onClick={() => setOnlySelf(!onlySelf)} className={`${onlySelf ? 'text-purple-500 hover:text-slate-600' : 'text-slate-800 hover:text-purple-500'} transition `}>
          <UserIcon className='h-6 w-6' />
        </button>
      </span>
      <div className='mx-2 pt-2 px-2 transition'>
        <MovementSummary
          history={tickets
            .map((t) => [
              t.payments.map((p) => ({ ...p, ticketName: t.name })),
              t.waivers.map((w) => ({ ...w, ticketName: t.name })),
            ])
            .flat(2)
            .filter(h => {
              if(!onlySelf){
                return true
              }
              if(h.to){
                return h.from._id === me || h.to._id === me;
              }
              return h.from._id === me;
            })
          }
        />
      </div>
    </>
  );
};

export default Balance;
