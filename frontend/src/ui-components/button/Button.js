import React from 'react';

const Button = ({ type = 'button', secondary, onClick, children, disabled = false, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
          flex
          items-center
          justify-center
          ${!secondary ? 'bg-purple-500' : 'bg-transparent'}
          ${!secondary ? 'text-slate-50' : 'text-purple-500'}
          ${!secondary ? '' : "border-2 border-purple-500"}
          ${!secondary ? "hover:bg-purple-600" : "hover:text-purple-700 hover:border-purple-700"}

          sm:text-base
          rounded-xl
          py-2
          w-full

          transition
          duration-150
          ease-in
          focus:outline-none
          focus:ring-1
          focus:ring-purple-500
          focus: ring-offset-2

          ${className}
        `}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
