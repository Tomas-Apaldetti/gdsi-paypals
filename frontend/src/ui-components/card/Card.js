import React from 'react';

export const Card = ({ className, children }) => {
  return (
    <div
      className={`
      flex
      flex-col
      bg-slate-50
      shadow-md
      px-4
      sm:px-6
      md:px-8
      lg:px-10
      py-8
      rounded-sm
      w-full
      md:w-1/2
      lg:w-1/3

      transition
      ${className}`}
    >
      {children}
    </div>
  );
};
