import { Disclosure, Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { user } from 'utils/auth';
import { classNames } from 'utils/classNames';

const userNavigation = [{ name: 'Sign out', href: '/logout' }];

const Desktop = () => {
  return (
    <div className='hidden md:block'>
      <div className='ml-4 flex items-center md:ml-6'>

        <Menu as='div' className='relative ml-3'>
          <div>
            <Menu.Button className='relative flex justify-center  items-center outline-none rounded-sm p-2 focus:ring-2 focus:ring-slate-50'>
              <span className='absolute -inset-1.5' />
              <span className='sr-only'>Open user menu</span>
              <p className='tracking-wider text-slate-50 text-lg font-semibold'>{user().username}</p>
              <ChevronDownIcon className='h-6 w-6 text-slate-50'/>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-sm bg-slate-50 shadow-lg ring-2 ring-slate-800 ring-opacity-5 focus:outline-none'>
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      to={item.href}
                      className={classNames(
                        active ? 'bg-purple-500 text-slate-50' : 'text-slate-800',
                        'block px-4 py-2 text-sm rounded-sm font-normal tracking-wide')}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

const Mobile = () => {
  return (
    <div className='border-t border-gray-700 pb-3 pt-4'>
      <div className='flex items-center px-5'>
        <div className='flex-shrink-0'></div>
        <div className=''>
          <div className='text-base font-semibold tracking-wider leading-none text-slate-50'>{user().username}</div>
          <div className='text-sm font-light leading-none text-slate-300'>{user().email}</div>
        </div>
      </div>
      <div className='mt-3 space-y-1 mx-2'>
        {userNavigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as={Link}
            to={item.href}
            className='block rounded-sm px-6 py-2 text-base font-medium text-slate-50 hover:bg-slate-50 hover:text-purple-500'
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
    </div>
  );
};

export { Desktop, Mobile };
