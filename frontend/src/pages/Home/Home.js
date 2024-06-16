import ThreeColumn from 'ui-components/layouts/ThreeColumn';
import { NavbarFooterLayout } from 'ui-components/layouts/NavbarFooterLayout';
import { GroupsInfo } from 'pages/Groups/GroupsInfo';
import { ChartBarIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'react-router-dom';
import List from 'pages/Ticket/List';
import Balance from 'pages/Balance/Balance';
import { Loading } from 'logic-components/Loading';
import { getTickets } from 'services/tickets';
import { useAPIData } from 'hooks/useAPIData';
import { useEffect } from 'react';

const _getTickets = (queryparams) => async () => {
  return await getTickets(queryparams.get('group'));
};

export default function Home() {
  const [queryparams] = useSearchParams();
  let { data: tickets, loading, error, setStale } = useAPIData(_getTickets(queryparams), [], []);
  useEffect(()=>{
    setStale(true);
  }, [queryparams, setStale]);

  return (
    <NavbarFooterLayout>
      <ThreeColumn
        mainColumn={
          <Loading loading={loading} error={error}>
            <List tickets={tickets} setStale={setStale} />
          </Loading>
        }
        leftColumn={[<GroupsInfo />]}
        rightColumn={[
          <Loading loading={loading} error={error} >
            <Balance tickets = {tickets} />
          </Loading>
        ]}
        leftColumnIcon={<UserGroupIcon className='h-6 w-6'></UserGroupIcon>}
        rightColumnIcon={<ChartBarIcon className='h-6 w-6'></ChartBarIcon>}
      />
    </NavbarFooterLayout>
  );
}
