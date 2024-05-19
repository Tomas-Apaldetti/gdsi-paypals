import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useRef, useState } from 'react';
import { triggerOnChange } from 'utils/triggerOnChange';

export const DebtorList = ({ options, defaultSelected = [], onChange, handleBlur, error = false, touched = false }) => {
  const isTouched = typeof touched === 'object' ? touched['debtors'] : touched;
  const errorDesc = typeof error === 'object' ? error['debtors'] : error;
  const showError = isTouched && errorDesc;

  const [selected, setSelected] = useState(defaultSelected);
  const inputRef = useRef(null);
  const selectedWrapper = (newValue) => {
    triggerOnChange('input', inputRef, JSON.stringify(newValue));
    setSelected(newValue);
  };

  return (
    <div className='flex flex-col py-2 w-full'>
      <Listbox value={selected} onChange={selectedWrapper} multiple name='debtors'>
        {({ open }) => (
          <>
            <Listbox.Label htmlFor={'debtors'} className='text-md sm:text-sm tracking-wide text-slate-700'>
              Debtors
            </Listbox.Label>
            <div className='relative'>
              <Listbox.Button
                className={`
                relative
                mt-2
                cursor-default
                text-md
                sm:text-sm
                w-full
                rounded-sm
                bg-white
                px-2
                py-2
                border
                ${showError ? 'border-red-400' : 'border-slate-300'}
                focus:ring-2
                focus:ring-purple-500
                text-left
                `}
              >
                <span className='px-2'>{`${selected.length} selected debtors`}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                  <ChevronUpDownIcon className='h-5 w-5 text-slate-500' aria-hidden='true' />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                enter='transition duration-200 ease-out'
                enterFrom='transform scale-y-0 opacity-0'
                enterTo='transform scale-y-100 opacity-100'
                leave='transition duration-200 ease-out'
                leaveFrom='transform scale-y-100 opacity-100'
                leaveTo='transform scale-y-0 opacity-0'
              >
                <Listbox.Options
                  className='
                absolute
                z-10
                mt-1
                max-h-56
                w-full
                overflow-auto
                rounded-sm
                bg-white
                py-1
                text-base
                shadow-lg
                ring-2
                ring-slate-800
                ring-opacity-5
                focus:outline-none
                sm:text-sm
              '
                >
                  {options.map((option) =>
                    selected.includes(option) ? null : (
                      <Listbox.Option
                        key={option._id}
                        value={option}
                        className='text-md px-4 border-b py-1 last:border-b-0 border-slate-300 hover:bg-purple-500 hover:text-slate-50 transition'
                      >
                        {option.username}
                      </Listbox.Option>
                    ),
                  )}
                </Listbox.Options>
              </Transition>
            </div>
            <input
              id={'debtors'}
              name={'debtors'}
              ref={inputRef}
              className='hidden'
              onChange={onChange}
              onBlur={handleBlur}
            />
          </>
        )}
      </Listbox>
      {showError && <p className='text-sm text-red-400 px-2'> {errorDesc} </p>}
      <div className='flex w-full mt-2 gap-2'>
        {selected.map((debtor) => (
          <DebtorBtn key={debtor.id} value={debtor} selected={selected} setSelected={selectedWrapper} />
        ))}
      </div>
    </div>
  );
};

const DebtorBtn = ({ value, selected, setSelected }) => {
  return (
    <div className='flex items-center justify-center w-fit rounded-sm border border-slate-400 text-slate-500 has-[button:hover]:border-red-400 has-[button:hover]:text-red-400 transition'>
      <span className='pl-2'>{value.username}</span>
      <button
        onClick={() => setSelected(selected.filter((e) => e !== value))}
        className='ml-1 border-l border-slate-400 hover:text-red-400 transition hover:border-red-400'
      >
        <XMarkIcon className='h-4 w-4' />
      </button>
    </div>
  );
};
