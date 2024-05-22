import { DebtorBtn } from './DebtorBtn';
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
              <DebtorBtn key={debtor.id} value={debtor} amount={`${100/selected.length} %`} selected={selected} setSelected={setSelected} />
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

