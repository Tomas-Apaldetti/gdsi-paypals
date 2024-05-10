import { Disclosure, } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react'
import Logo from './Logo';
import * as Navigation from './Navigation';
import * as UserMenu from './UserMenu';


function Navbar() {
  return (
    <Disclosure as='nav' className='z-20 bg-slate-800 w-full'>
          {({ open }) => (
            <>
              <div className='mx-auto w-full lg:w-11/12 2xl:w-4/5 px-4 lg:px-0 sm:px-6'>
                <div className='flex h-12 items-center justify-between'>
                  <div className='flex items-center'>
                    <Logo />
                    <Navigation.Desktop />
                  </div>

                  <UserMenu.Desktop />


                  <div className='-mr-2 flex md:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='p-2 relative inline-flex items-center justify-center rounded-sm border-slate-50 border-2 focus:outline-none focus:ring-2 text-slate-50 transition hover:text-purple-500 hover:border-purple-500 focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-gray-800'>
                      <span className='absolute -inset-0.5' />
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon className='block h-5 w-5' aria-hidden='true' />
                      ) : (
                        <Bars3Icon className='block h-5 w-5' aria-hidden='true' />
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
