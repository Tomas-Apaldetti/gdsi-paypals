import { Ticket } from './Ticket';
import { TopBar } from './TopBar';
import { getTickets } from 'services/tickets';
import { useSearchParams } from 'react-router-dom';
import { useAPIData } from 'hooks/useAPIData';
import { Loading } from 'logic-components/Loading';

export default function List() {
  const [queryparams] = useSearchParams();

  const {
    data: tickets,
    loading,
    error,
    setStale,
  } = useAPIData(async () => await getTickets(queryparams.get('group')), [], []);

  return (
    <div className='w-full h-full'>
      <TopBar onCreation={() => setStale(true)} />
      <Loading loading={loading} error={error}>
        {tickets.map((ticket) => (
          <Ticket ticket={ticket} key={ticket.id} />
        ))}
      </Loading>
    </div>
  );
}
