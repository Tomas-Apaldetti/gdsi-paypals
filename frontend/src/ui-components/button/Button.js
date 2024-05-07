import React from 'react';

const Button = ({ type = 'button', onClick, children, disabled}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className='
          flex
          items-center
          justify-center
          text-slate-50 text-sm
          sm:text-base
          bg-purple-500

          rounded-xl
          py-2
          w-full

          transition
          duration-150
          ease-in
          focus:outline-offset-2
          focus:outline-2
          focus:outline-purple-600
          hover:bg-purple-600
        '
        disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
