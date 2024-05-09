import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react';

export const Modal = ({ title, open, setOpen, onClose, children }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      className='fixed inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm z-50 w-screen h-screen flex justify-center items-center'
    >
      <Dialog.Panel className='relative bg-slate-100 w-full md:w-2/3 xl:w-1/2 2xl:w-2/5 h-2/3 rounded-xl ring-1 ring-slate-500 shadow-lg flex flex-col'>
        {title ? (
          <div className='bg-purple-500 rounded-t-xl ring-1 ring-slate-500 px-4 py-2 text-xl font-semibold tracking-wider uppercase text-slate-50 flex justify-between'>
            <Dialog.Title>{title}</Dialog.Title>
            <button
              onClick={() => {
                onClose();
                setOpen(false);
              }}
            >
              <XMarkIcon className='h-6 w-6 text-purple-700'></XMarkIcon>
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

        <div className='h-max ml-4 mr-2 my-4 overflow-auto'>{children}</div>
      </Dialog.Panel>
    </Dialog>
  );
};
