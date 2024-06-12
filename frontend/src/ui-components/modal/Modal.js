import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';

export const Modal = ({ title, open, setOpen, onClose, icon, children }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className='relative z-50'>
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
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className='fixed inset-0 flex w-screen items-center justify-center px-4'
        >
          <Dialog.Panel className='relative bg-slate-100 max-w-full md:max-w-2xl xl:max-w-xl 2xl:max-w-2xl max-h-full rounded-sm ring-1 ring-slate-600 shadow-lg flex flex-col transition'>
            {title ? (
              <div className='bg-slate-900 rounded-t-sm border-b-2 border-b-purple-500 px-4 py-2 text-xl font-semibold tracking-wider uppercase text-slate-50 flex justify-between'>
                <Dialog.Title>{title}</Dialog.Title>
                {icon}
                <button
                  onClick={() => {
                    onClose();
                    setOpen(false);
                  }}
                >
                  <XMarkIcon className='h-6 w-6 text-slate-500 hover:text-purple-500 transition'></XMarkIcon>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  setOpen(false);
                }}
              >
                <XMarkIcon className='absolute top-4 right-6 bg-slate-100 h-8 w-8 text-slate-500' />
              </button>
            )}

            <div className='max-h-full mx-2 my-4 overflow-auto transition'>{children}</div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
