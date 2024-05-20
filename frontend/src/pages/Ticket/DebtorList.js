import { XMarkIcon } from '@heroicons/react/20/solid';
import { MultipleDropwDownList } from 'ui-components/input/MultipleDropwDownList';
import React from 'react';

export const DebtorList = ({ options, initial, handleChange, handleBlur, error = false, touched = false }) => {
  return (
    <div className='flex flex-col py-2 w-full'>
      <MultipleDropwDownList
        id={'debtors'}
        label={'Debtors'}
        options={options}
        initial={initial}
        inputRender={({ selected }) => `${selected.length} debtors selected`}
        optionRender={({ value, isSelected }) => (
          <>
            {isSelected ? null : (
              <span
                className={`w-full block text-md px-4 border-b py-1 last:border-b-0 border-slate-300 hover:bg-purple-500 hover:text-slate-50 transition`}
              >
                {value.username}
              </span>
            )}
          </>
        )}
        selectedRender={({ selected, setSelected }) => (
          <div className='flex w-full mt-2 gap-2'>
            {selected.map((debtor) => (
              <DebtorBtn key={debtor.id} value={debtor} selected={selected} setSelected={setSelected} />
            ))}
          </div>
        )}

        onChange={handleChange}
        handleBlur={handleBlur}
        error={error}
        touched={touched}
      />
    </div>
  );
};

const DebtorBtn = ({ value, selected, setSelected }) => {
  return (
    <div className='flex items-center justify-center w-fit rounded-sm border border-slate-400 text-slate-500 has-[button:hover]:border-red-400 has-[button:hover]:text-red-400 transition'>
      <span className='pl-2'>{value.username}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          setSelected(selected.filter((e) => e !== value));
        }}
        className='ml-1 border-l border-slate-400 hover:text-red-400 transition hover:border-red-400'
      >
        <XMarkIcon className='h-4 w-4' />
      </button>
    </div>
  );
};
