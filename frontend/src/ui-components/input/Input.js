import React from 'react';

export const Input = ({
  icon = null,
  id,
  type = 'text',
  textarea = false,
  step = 0,
  placeholder = '',
  onChange,
  className = '',
  handleBlur,
  error,
  touched,
}) => {
  const isTouched = typeof touched === 'object' ? touched[id] : touched;
  const errorDesc = typeof error === 'object' ? error[id] : error;
  const showError = isTouched && errorDesc;

  const inputStyle = `
    text-md
    sm:text-sm
    placeholder-slate-500
    ${icon ? 'pl-8 pr-4' : 'px-4'}
    rounded-sm
    border
    ${showError ? 'border-red-400' : 'border-slate-300'}
    w-full
    py-2
    focus:outline-none
    focus:ring-purple-500
    focus:ring-2
    ${className}
`;

  const inputIcon = icon && React.cloneElement(
    icon,
    {className: 'absolute top-1/2 -translate-y-1/2 mx-2 h-4 w-4 text-slate-500' }
  )

  return (
    <div className='flex flex-col py-2 w-full'>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleBlur}
          className={`${inputStyle} resize-y max-h-96 min-h-10 overflow-y-auto`}
        ></textarea>
      ) : (
        <div className='relative'>
          <input
            id={id}
            type={type}
            step={step}
            name={id}
            className={inputStyle}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={handleBlur}
          />
          {icon && inputIcon}
        </div>
      )}

      {showError && <p className='text-sm text-red-400 px-2'> {errorDesc} </p>}
    </div>
  );
};
