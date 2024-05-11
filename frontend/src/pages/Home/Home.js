import ThreeColumn from 'ui-components/layouts/ThreeColumn';
import { NavbarFooterLayout } from 'ui-components/layouts/NavbarFooterLayout';
import { GroupsInfo } from './GroupsInfo';
import { ChartBarIcon, UserGroupIcon } from '@heroicons/react/20/solid';

export default function Home() {
  return (
    <NavbarFooterLayout>
      <ThreeColumn
        leftColumn={[
            <GroupsInfo/>
        ]}
        leftColumnIcon={<UserGroupIcon className='h-6 w-6'></UserGroupIcon>}
        rightColumnIcon={<ChartBarIcon className='h-6 w-6'></ChartBarIcon>}
      />


      {/* <header className='bg-indigo-300 shadow'>
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
        </main> */}
    </NavbarFooterLayout>
  );
}
