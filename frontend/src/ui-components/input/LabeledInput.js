import React from 'react';

export const LabeledInput = ({ id, type = 'text', label, placeholder = "", onChange, handleBlur, error, touched }) => {
  const isTouched = typeof touched === "object" ? touched[id] : touched;
  const errorDesc = typeof error === "object" ? error[id] : error;
  const showError = isTouched && errorDesc;

  return (
    <div className='flex flex-col mb-5'>
      <label htmlFor={id} className='mb-1 text-md sm:text-sm tracking-wide text-slate-700'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        className={`
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
                  ${showError && 'border-red-400'}
                `}
        placeholder= {placeholder}
        onChange={onChange}
        onBlur={handleBlur}
      />
      {showError && <p className='text-sm text-red-400 px-2'> {errorDesc} </p>}
    </div>
  );
};
