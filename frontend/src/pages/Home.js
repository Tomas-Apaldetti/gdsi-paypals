import { Card } from 'ui-components/card/Card';
import Button from 'ui-components/button/Button';
import Navbar from 'ui-components/layouts/Navbar/Navbar';
import { useState } from 'react';
import { Modal } from 'ui-components/modal/Modal';
import GroupCreation from './Groups/Creation';

export default function Example() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      <div className='min-h-screen bg-slate-300'>
        <Navbar />

        <header className='bg-indigo-300 shadow'>
          <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>Welcome to PayPals :)</h1>
          </div>
        </header>
        <main>
          <button onClick={() => setShowCreate(!showCreate)}>
              Create Group
          </button>
          <Modal open={showCreate} setOpen={setShowCreate} title={"Create Group"} onClose={() => setShowCreate(false)} >
            <GroupCreation onSuccesfullSubmit={() => setShowCreate(false)} onCancel={()=> setShowCreate(false)}/>
          </Modal>

          <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-row justify-center'>
            <Card>
              <a href='/ticket/create'>
                <Button>Create Ticket</Button>
              </a>
            </Card>
            <Card>
              <a href='/group/create'>
                <Button>Create Group</Button>
              </a>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
