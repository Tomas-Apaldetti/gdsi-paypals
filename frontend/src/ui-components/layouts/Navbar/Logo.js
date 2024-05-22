import React from 'react';
import logoBlanco from 'public/logoBlanco.png'

const Logo = () => {
  return (
    <div className='flex items-center'>
      <img src={logoBlanco} width="130" alt="PayPals"></img>
    </div>
  );
};

export default Logo;
