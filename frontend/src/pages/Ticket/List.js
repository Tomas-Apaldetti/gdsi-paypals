import { Ticket } from './Ticket';
import { TopBar } from './TopBar';
import { getTickets } from 'services/tickets';
import { useSearchParams } from 'react-router-dom';
import { useAPIData } from 'hooks/useAPIData';
import { Loading } from 'logic-components/Loading';
import { useEffect, useState } from 'react';
export default function List() {
  const [queryparams] = useSearchParams();
  const [searchText, setSearchText] = useState('')

  const _getTickets = () => {
    return async () => {
      return await getTickets(queryparams.get('group'));
    };
  };

  let { data: tickets, loading, error, setStale } = useAPIData(_getTickets(), [], []);

  const searchTicket = (e) => {
    e.preventDefault()
    setSearchText(e.target.value)
  }
  useEffect(() => {
    setStale(true)
  }, [queryparams, setStale])

  return (
    <div className='w-full h-full'>
      <TopBar onCreation={() => setStale(true)} searchTicket={searchTicket}/>
      <Loading loading={loading} error={error}>
        <div className='h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden p-4'>
          {tickets.filter((x) => x.name.toLowerCase().includes(searchText)).map((ticket, index) => (
            <Ticket ticket={ticket} key={index} onEdition={() => setStale(true)} />
          ))}
        </div>
      </Loading>
    </div>
  );
}
