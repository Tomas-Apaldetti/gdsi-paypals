import { Disclosure } from '@headlessui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { classNames } from 'utils/classNames';

const navigation = [
  { name: 'Home', href: '/'},
  { name: 'Test', href: '/test'}
];

const Mobile = () => {
  const location = useLocation();
  return (
    <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
      {navigation.map((item) => (
        <Disclosure.Button
          key={item.name}
          as={Link}
          to={item.href}
          className={classNames(
            item.href === location.pathname ? 'underline underline-offset-4 pointer-events-none' : 'hover:text-purple-200',
            'block px-3 py-2 font-semibold tracking-wider text-slate-50',
          )}
          aria-current={ item.href === location.pathname ? 'page' : undefined}
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </div>
  );
};

const Desktop = () => {
  const location = useLocation();

  return (
    <div className='hidden md:block'>
      <div className='ml-10 flex items-baseline space-x-4'>
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={classNames(
              item.href === location.pathname ? ' underline underline-offset-4 pointer-events-none' : 'hover:text-purple-200',
              'px-3 py-2 text-lg font-semibold tracking-wider text-slate-50',
            )}
            aria-current={item.href === location.pathname ? 'page' : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export { Mobile, Desktop };
