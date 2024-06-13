import ThreeColumn from 'ui-components/layouts/ThreeColumn';
import { NavbarFooterLayout } from 'ui-components/layouts/NavbarFooterLayout';
import { GroupsInfo } from 'pages/Groups/GroupsInfo';
import { ChartBarIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'react-router-dom';
import List from 'pages/Ticket/List'
import Balance from 'pages/Balance/Balance';

export default function Home() {
  const [queryparams] = useSearchParams();
  return (
    <NavbarFooterLayout>
      <ThreeColumn
        mainColumn={<List />}
        leftColumn={[
            <GroupsInfo/>
        ]}
        rightColumn={[<Balance queryParamGroup={queryparams.get('group')}/>]}
        leftColumnIcon={<UserGroupIcon className='h-6 w-6'></UserGroupIcon>}
        // rightColumnIcon={<ChartBarIcon className='h-6 w-6'></ChartBarIcon>}
      />
    </NavbarFooterLayout>
  );
}
