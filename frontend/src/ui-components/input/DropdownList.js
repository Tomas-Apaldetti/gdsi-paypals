import React, { useRef } from 'react';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { classNames } from 'utils/classNames';
import { triggerOnChange } from 'utils/triggerOnChange';

function defaultRenderDisplay(selected) {
  return <span className="ml-3 block truncate">{selected.value}</span>

}

function defaultRenderOption(option, isSelected, _isHovered) {
  return (
    <span className={classNames(isSelected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>{option.value}</span>
  );
}


export const DropdownList = ({ id,
  onChange,
  label,
  options,
  initial,
  renderDisplay = defaultRenderDisplay,
  renderOption = defaultRenderOption,
  handleBlur,
  error = false,
  touched = false }) => {
  const [selected, setSelected] = useState(initial);
  const inputRef = useRef(null);

  const isTouched = typeof touched === "object" ? touched[id] : touched;
  const errorDesc = typeof error === "object" ? error[id] : error;
  const showError = isTouched && errorDesc;

  return (
    <div className='py-2'>
      <Listbox name={id} value={selected} onChange={(newValue) => {
        triggerOnChange('input', inputRef, JSON.stringify(newValue))
        setSelected(newValue);
      }}>
        {({ open }) => (
          <>
            <Listbox.Label htmlFor={id} className='text-md sm:text-sm tracking-wide text-slate-700'>{label}</Listbox.Label>
            <div className='relative'>
              <Listbox.Button className={`
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
                `}>
                {
                  <span className='flex items-center'>
                    {renderDisplay(selected)}
                  </span>
                }
                <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                  <ChevronUpDownIcon className='h-5 w-5 text-slate-500' aria-hidden='true' />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='
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
              '>
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-purple-500 text-white' : 'text-slate-800',
                          'relative cursor-default select-none px-2 py-2',
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className='flex items-center'>
                            {
                              renderOption(option, selected, active)
                            }
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-purple-500',
                                'absolute inset-y-0 right-0 flex items-center px-2',
                              )}
                            >
                              <CheckIcon className='h-5 w-5' aria-hidden='true' />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
            <input id={id} name={id} ref={inputRef} className='hidden' onChange={onChange} onBlur={handleBlur}/>
          </>
        )}
      </Listbox>
      {showError && <p className='text-sm text-red-400 px-2'> {errorDesc} </p>}
    </div>
  );
};
