import ThreeColumn from 'ui-components/layouts/ThreeColumn';
import { NavbarFooterLayout } from 'ui-components/layouts/NavbarFooterLayout';
import { GroupsInfo } from 'pages/Groups/GroupsInfo';
import { ChartBarIcon, UserGroupIcon } from '@heroicons/react/20/solid';
import List from 'pages/Ticket/List'

export default function Home() {
  return (
    <NavbarFooterLayout>
      <ThreeColumn
        mainColumn={<List />}
        leftColumn={[
            <GroupsInfo/>
        ]}
        leftColumnIcon={<UserGroupIcon className='h-6 w-6'></UserGroupIcon>}
        rightColumnIcon={<ChartBarIcon className='h-6 w-6'></ChartBarIcon>}
      />
    </NavbarFooterLayout>
  );
}
