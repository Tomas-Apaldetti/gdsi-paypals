import React from 'react'
import Navbar from './Navbar/Navbar'

export const NavbarFooterLayout = ({children}) => {
  return (
    <>
    <div className='min-h-screen bg-slate-300 flex flex-col items-center bg-gradient-to-b from-slate-100 to-slate-400'>
      <Navbar />
      <div className='h-screen w-full lg:w-11/12 2xl:w-4/5 bg-slate-50 shadow-lg'>
        {children}
      </div>
      <footer className='z-20 min-h-12 w-full bg-slate-800 flex flex-col justify-center'>
        <p className='text-lg uppercase font-semibold tracking-wider text-slate-50 px-6 py-2'></p>
      </footer>


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
    </div>
  </>
  )
}
