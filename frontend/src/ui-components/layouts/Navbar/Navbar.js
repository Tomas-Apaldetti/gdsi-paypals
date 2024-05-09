import { Disclosure, } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react'
import Logo from './Logo';
import * as Navigation from './Navigation';
import * as UserMenu from './UserMenu';


function Navbar() {
  return (
    <Disclosure as='nav' className='bg-purple-700'>
          {({ open }) => (
            <>
              <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                  <div className='flex items-center'>
                    <Logo />
                    <Navigation.Desktop />
                  </div>

                  <UserMenu.Desktop />


                  <div className='-mr-2 flex md:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='p-2 relative inline-flex items-center justify-center rounded-md border-slate-50 border-2 p-2focus:outline-none focus:ring-2 text-slate-50 transition hover:text-slate-700 hover:border-slate-700 focus:ring-slate-700 focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='absolute -inset-0.5' />
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                      ) : (
                        <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='md:hidden'>
                <Navigation.Mobile/>

                <UserMenu.Mobile />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
  )
}

export default Navbar
