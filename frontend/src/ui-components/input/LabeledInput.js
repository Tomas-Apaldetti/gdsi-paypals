import React from 'react';

export const LabeledInput = ({ id, type = 'text', label, placeholder = "", onChange }) => {
  return (
    <div className='flex flex-col mb-5'>
      <label htmlFor={id} className='mb-1 text-md sm:text-sm tracking-wide text-slate-700'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        className='
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
                '
        placeholder= {placeholder}
        onChange={onChange}
      />
    </div>
  );
};
