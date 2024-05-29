import { Input } from 'ui-components/input/Input';
import React, { useState } from 'react';
import Button from 'ui-components/button/Button';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Modal } from 'ui-components/modal/Modal';
import { TicketCreation } from './Creation';

export const TopBar = ({ onCreation, searchTicket }) => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className='flex bg-slate-50 px-4 w-full items-center border-b border-slate-200 shadow-sm'>
      <Input icon={<MagnifyingGlassIcon />} id='search' placeholder='Search' className='h-10' onChange={searchTicket} />
      <Button className='ml-4 w-12 md:w-28' onClick={() => setShowCreate(true)}>
        <PlusIcon className='h-6 w-6' />
      </Button>

      <Modal open={showCreate} setOpen={setShowCreate} title={'Create Ticket'} onClose={() => setShowCreate(false)}>
        <TicketCreation
          onSuccesfullSubmit={(respBody) => {
            onCreation && onCreation(respBody);
            setShowCreate(false);
          }}
          onCancel={() => setShowCreate(false)}
        />
      </Modal>
    </div>
  );
};
