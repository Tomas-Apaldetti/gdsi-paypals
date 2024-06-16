import { Ticket } from './Ticket';
import { TopBar } from './TopBar';
import { useState } from 'react';
export default function List({ tickets, setStale }) {
  const [searchText, setSearchText] = useState('')

  const searchTicket = (e) => {
    e.preventDefault()
    setSearchText(e.target.value)
  }

  return (
    <div className='w-full h-full'>
      <TopBar onCreation={() => setStale(true)} searchTicket={searchTicket}/>
        <div className='h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden p-4'>
          {tickets.filter((x) => x.name.toLowerCase().includes(searchText)).map((ticket, index) => (
            <Ticket ticket={ticket} key={index} onEdition={() => setStale(true)} />
          ))}
        </div>
    </div>
  );
}
