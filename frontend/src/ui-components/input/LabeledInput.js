import React from 'react';

export const LabeledInput = ({ id, type = 'text', step = 0, label, placeholder = "", onChange, className = "" }) => {
  return (
    <div className='flex flex-col py-2'>
      <label htmlFor={id} className='text-md sm:text-sm tracking-wide text-slate-700'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        step={step}
        name={id}
        className='
                  mt-2
                  text-md
                  sm:text-sm
                  placeholder-slate-500
                  px-4
                  rounded-xl
                  border
                  border-slate-500
                  w-full
                  py-2
                  focus:outline-none
                  focus:ring-purple-500
                  focus:ring-2
                  `${className}`
                '
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};