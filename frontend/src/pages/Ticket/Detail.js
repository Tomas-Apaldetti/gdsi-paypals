import React from 'react';
import { LabeledInput } from 'ui-components/input/LabeledInput';
import { classNames } from 'utils/classNames';
import { DropdownList } from 'ui-components/input/DropdownList';
import { categories } from 'utils/categories';
import { CurrencyDollarIcon, TagIcon } from '@heroicons/react/20/solid';
import { DebtorBtn } from './DebtorBtn';

export const TicketDetail = ({ ticket }) => {
  const defaultCategory = categories.find(({ id }) => id === ticket.category);

  return (
    <div className='max-h-full w-92 sm:w-112 md:w-128 flex flex-col justify-center px-4 pb-4 transition'>
      <LabeledInput
        icon={<TagIcon />}
        id='name'
        placeholder='Ticket Name'
        label='Name'
        defaultValue={ticket.name}
        setDisabled={'disabled'}
      />

      <LabeledInput
        icon={<CurrencyDollarIcon />}
        id='amount'
        type='number'
        step='0.01'
        placeholder='0.00'
        label='Amount'
        defaultValue={ticket.amount}
        setDisabled={'disabled'}
      />

      <DropdownList
        id='category'
        label='Category'
        options={[defaultCategory]}
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
        setDisabled={'disabled'}
      />

      <div className='py-2'>
        <label className='text-md sm:text-sm tracking-wide text-slate-700 font-semibold'>Debtors</label>
        <div className='flex w-full mt-2 gap-2 flex-wrap'>
          {ticket.debtors.map((debtor) => (
            <DebtorBtn key={debtor.id} debtor={debtor} />
          ))}
        </div>
      </div>

      <LabeledInput
        id='comment'
        label='Comment'
        placeholder='Enter your comment'
        defaultValue={ticket.comment}
        setDisabled={'disabled'}
      />
    </div>
  );
};
