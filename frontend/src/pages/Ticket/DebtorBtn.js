import { XMarkIcon } from '@heroicons/react/20/solid';
import { React, useEffect, useState } from 'react';

export const DebtorBtn = ({ debtor, selected = null, setSelected = null, handleChange, debtors, selectedButton, ticketAmount }) => {

  const [equallyAmount, setEquallyAmount] = useState(parseFloat((ticketAmount / debtors?.length).toFixed(2)));

  const FIXED = 0;
  const EQUALLY = 1;
  const PERCENTAGE = 2;

  useEffect(() => {
    calculateEqually();
  }, [ticketAmount, debtors?.length, selectedButton]);

  const calculateEqually = () => {
    const value = parseFloat((ticketAmount / debtors?.length).toFixed(2)) ?? 0
    setEquallyAmount(value);
    const updatedDebtors = debtors?.map(x =>
      ({ ...x, amount: value.toFixed(2) })
    );
    if (handleChange) {
      handleChange({
      target: {
        name: 'debtors',
        value: JSON.stringify(updatedDebtors),
      },
    });
    }
  };

  const calculatePercentage = (amount) => {
    if (ticketAmount === 0 || amount === 0) return 0;
    return parseFloat(((amount / ticketAmount) * 100).toFixed(2));
  };

  return (
    <div className='flex items-center justify-center w-fit rounded-sm border border-slate-400 text-slate-500 has-[button:hover]:border-red-400 has-[button:hover]:text-red-400 transition'>
      <span className='pl-2'>{debtor.username}</span>
      {selectedButton === FIXED && (
        <div className='relative'>
          <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500'>$</span>
          <input
            className='text-right pr-2 w-20 ml-2 pl-2 border-l border-slate-400'
            defaultValue={parseFloat(debtor.amount ?? 0).toFixed(2) ?? 0}
            onChange={(e) => {
              const updatedDebtors = debtors.map(x =>
                x.id === debtor.id ? { ...x, amount: parseFloat(e.target.value).toFixed(2) } : x
              );
              handleChange({
                target: {
                  name: 'debtors',
                  value: JSON.stringify(updatedDebtors),
                },
              });
            }}
          />
        </div>
      )}
      {selectedButton === EQUALLY && (
        <div className='relative w-20 mr-4'>
          <input
            className='w-20 ml-2 pl-2 border-l border-slate-400'
            value={equallyAmount}
          />
        </div>
      )}
      {selectedButton === PERCENTAGE && (
        <div className='relative'>
          <span className='absolute left-16 top-1/2 transform -translate-y-1/2 text-slate-500'>%</span>
          <input
            className='w-20 ml-2 pl-2 border-l border-slate-400'
            defaultValue={calculatePercentage(debtor.amount ?? 0) ?? 0}
            onChange={(e) => {
              const updatedDebtors = debtors.map(x =>
                x.id === debtor.id ? { ...x, amount: parseFloat(((e.target.value / 100) * ticketAmount).toFixed(2)) } : x
              );
              handleChange({
                target: {
                  name: 'debtors',
                  value: JSON.stringify(updatedDebtors),
                },
              });
            }}
          />
        </div>
      )}
      {selectedButton === undefined && (
        <div className='relative w-20 mr-4'>
          <span className='w-20 ml-2 pl-2 border-l bordedr-slate-400'>
            {`$${parseFloat(debtor.amount).toFixed(2)}` ?? ''}
          </span>
        </div>
      )}
      {selected && setSelected && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setSelected(selected.filter((e) => e !== debtor));
          }}
          className='border-l border-slate-400 hover:text-red-400 transition hover:border-red-400'
        >
          <XMarkIcon className='h-4 w-4' />
        </button>
      )}
    </div>
  );
};
