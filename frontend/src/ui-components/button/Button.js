import React from 'react';

const Button = ({ type = 'button', onClick, children, className = "", bgcolor = "bg-purple-500", focusoutlinecolor = "outline-purple-600", hovercolor = "bg-purple-600" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
          flex
          items-center
          justify-center
          text-slate-50 text-sm
          sm:text-base
          ${bgcolor}

          rounded-xl
          py-2
          w-full

          transition
          duration-150
          ease-in
          focus:outline-offset-2
          focus:outline-2
          focus:${focusoutlinecolor}
          hover:${hovercolor}
          ${className}
        `}
    >
      {children}
    </button>
  );
};

export default Button;
