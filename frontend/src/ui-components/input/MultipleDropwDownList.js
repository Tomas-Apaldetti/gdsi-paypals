import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { useRef, useState } from 'react';
import { triggerOnChange } from 'utils/triggerOnChange';

function defaultInputRender({ selected, options }) {
  return selected.join(',');
}

function defaultOptionRender({ value, isSelected }) {
  return (
    <span
      className={`
      w-full block text-md px-4 border-b py-1 last:border-b-0 border-slate-300
        ${isSelected ? 'bg-purple-500 text-slate-50' : ''}
        ${isSelected ? 'hover:bg-red-700' : 'hover:bg-purple-500 hover:text-slate-50'}
       transition`}
    >
      {String(value)}
    </span>
  );
}

function defaultSelectedRender({ selected, options, setSelected }) {
  return null;
}

export const MultipleDropwDownList = ({
  id,
  label,
  options,
  initial = [],
  inputRender = defaultInputRender,
  optionRender = defaultOptionRender,
  selectedRender = defaultSelectedRender,
  onChange,
  handleBlur,
  error = false,
  touched = false,
}) => {
  const isTouched = typeof touched === 'object' ? touched[id] : touched;
  const errorDesc = typeof error === 'object' ? error[id] : error;
  const showError = isTouched && errorDesc;
  const [selected, setSelected] = useState(initial);

  const inputRef = useRef(null);
  const wrappedSetSelected = (newValue) => {
    triggerOnChange('input', inputRef, JSON.stringify(newValue));
    setSelected(newValue);
  };

  return (
    <div className='flex flex-col py-2 w-full'>
      <Listbox value={selected} onChange={wrappedSetSelected} multiple name='debtors'>
        {({ open }) => (
          <>
            <Listbox.Label htmlFor={id} className='text-md sm:text-sm tracking-wide text-slate-700'>
              {label}
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
                <span className='px-2'>{inputRender({ selected, options })}</span>
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
                  {options.map((option, i) => (
                    <Listbox.Option key={i} value={option} className='w-full'>
                      {optionRender({
                        value: option,
                        isSelected: selected.includes(option),
                      })}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
            <input id={id} name={id} ref={inputRef} className='hidden' onChange={onChange} onBlur={handleBlur} />
          </>
        )}
      </Listbox>
      {showError && <p className='text-sm text-red-400 px-2'> {errorDesc} </p>}
      {selectedRender({ selected, options, setSelected: wrappedSetSelected })}
    </div>
  );
};
