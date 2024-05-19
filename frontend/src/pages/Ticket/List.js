import { useEffect, useState } from 'react';
import { Ticket } from './Ticket';
import { TopBar } from './TopBar';
import { getTickets } from 'services/tickets';
import { useSearchParams } from 'react-router-dom';

export default function List() {
  const [stale, setStale] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [queryparams,] = useSearchParams();

  useEffect(() => {
    (async () => {
      if(!stale) return;
      setLoading(true);
      try {
        const response = await getTickets(queryparams.get('group'));
        setTickets(await response.json());
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
        setStale(false);
      }
    })();
  }, [tickets, loading, stale, queryparams]);
  return (
    <div className='w-full h-full'>
      <TopBar onCreation={() => setStale(true)} />
      {error && <div>{error}</div>}

      {tickets && tickets.map((ticket) => (
        <Ticket ticket={ticket} key={ticket.id} />
      ))}

    </div>
  );
}
