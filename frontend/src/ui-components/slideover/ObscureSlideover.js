import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';

export const ObscureSlideover = ({ width = 'w-4/5', left = false,  show, onClose, children }) => {
  return (
    <Transition show={show} as={Fragment}>
      <Dialog onClose={() => {}} className='relative z-50'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm ' />
        </Transition.Child>

        <Transition.Child
          as='div'
          enter='ease-out duration-300'
          enterFrom={`${left ? '-translate-x-full' : 'translate-x-full'}`}
          enterTo='translate-x-0'
          leave='ease-in duration-300'
          leaveFrom='translate-x-0'
          leaveTo={`${left ? '-translate-x-full' : 'translate-x-full'}`}
          className={`translate-x- fixed inset-0 flex ${left ? 'flex-row-reverse': 'flex-row'} w-screen items-center justify-end`}
        >
          <Dialog.Panel
            className={`relative bg-slate-100 ${width} h-full rounded-sm ring-1 ring-slate-600 shadow-lg flex flex-col`}
          >
            <button onClick={() => onClose()}>
              <XMarkIcon className='absolute top-4 right-6 bg-slate-100 h-8 w-8 text-slate-500' />
            </button>

            <div className='h-full mx-2 my-4 overflow-auto'>{children}</div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
