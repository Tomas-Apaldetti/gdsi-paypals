import { CalculatorIcon } from '@heroicons/react/20/solid';
import React from 'react';

const Logo = () => {
  return (
    <div className='flex items-center'>
      <CalculatorIcon className='h-8 w-8 mr-2 text-purple-200' />
        <p className='text-purple-200 text-xl tracking-wider'>PayPals</p>
    </div>
  );
};

export default Logo;
