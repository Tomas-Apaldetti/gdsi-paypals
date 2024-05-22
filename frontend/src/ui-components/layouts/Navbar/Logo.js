import { BanknotesIcon } from '@heroicons/react/20/solid';
import React from 'react';

const Logo = () => {
  return (
    <div className='flex items-center'>
      <img src='logoSlate.png' width="130" alt="PayPals"></img>
      {/* <BanknotesIcon className='h-8 w-8 mr-2 text-purple-500' />
        <p className='text-purple-500 text-xl font-bold tracking-wider'>PayPals</p> */}
    </div>
  );
};

export default Logo;
