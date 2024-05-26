import { Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';
import { notificationRenderer } from './util';
import { useNotifications } from 'context/NotificationContextProvider';

const Desktop = () => {
  const { notifications } = useNotifications();
  const renderedNotifications = notificationRenderer(notifications);

  return (
    <Menu as='div' className='relative'>
      <div>
        <Menu.Button
          disabled={notifications.length === 0}
          className='disabled:text-slate-500 text-slate-50 relative flex justify-center  items-center outline-none rounded-sm p-2 focus:ring-2 focus:ring-slate-50 transition'
        >
          <span className='absolute -inset-1.5' />
          <span className='sr-only'>Open notifications</span>
          <BellIcon className='h-8 w-8' />
          {notifications.length > 0 && (
            <span className='absolute text-purple-500 text-sm font-extrabold top-3'>
              {notifications.length > 9 ? '9+' : notifications.length}
            </span>
          )}
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
        <Menu.Items className='absolute right-0 z-10 mt-2 w-96 max-h-92 overflow-y-auto overflow-x-hidden origin-top-right rounded-sm bg-slate-50 shadow-lg ring-2 ring-slate-800 ring-opacity-5 focus:outline-none'>
          {renderedNotifications.map((renderedNotif, idx) => (
            <Menu.Item as='div' key={idx} className='max-h-20 overflow-clip'> {renderedNotif}</Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const Mobile = () => {};

export { Desktop, Mobile };
