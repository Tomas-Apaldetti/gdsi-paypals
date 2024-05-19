import { Ticket } from './Ticket';
import { TopBar } from './TopBar';
import { getTickets } from 'services/tickets';
import { useSearchParams } from 'react-router-dom';
import { useAPIData } from 'hooks/useAPIData';
import { Loading } from 'logic-components/Loading';
import { useEffect } from 'react';

export default function List() {
  const [queryparams] = useSearchParams();

  const _getTickets = () => {
    return async () => {
      return await getTickets(queryparams.get('group'));
    };
  };

  const { data: tickets, loading, error, setStale } = useAPIData(_getTickets(), [], []);

  useEffect(() => {
    setStale(true)
  }, [queryparams, setStale])

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
