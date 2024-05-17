import { Ticket } from './Ticket';
import { TopBar } from './TopBar';
import { tickets } from './ticket.test.data'


export default function List() {
  return (
    <div className='w-full h-full'>
      <TopBar />
      {tickets.map(ticket => (<Ticket ticket={ticket} key={ticket.id}/>))}
    </div>
  );
}
