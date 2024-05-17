import { Modal } from 'ui-components/modal/Modal';
import React, { useEffect, useState } from 'react';
import GroupCreation from 'pages/Groups/Creation';
import { PlusIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'react-router-dom';
import { getGroups } from 'services/groups';

const groups = [
  {
    id: 1,
    name: 'Un grupo',
    members: [
      {
        id: 1,
        username: 'pepe',
      },
      {
        id: 2,
        username: 'juana',
      },
      {
        id: 3,
        username: 'josefa',
      },
    ],
  },
  {
    id: 2,
    name: 'Otro grupo',
    members: [
      {
        id: 1,
        username: 'pepe',
      },
      {
        id: 2,
        username: 'juana',
      },
    ],
  },
  {
    id: 3,
    name: 'Mas grupos',
    members: [
      {
        id: 2,
        username: 'juana',
      },
      {
        id: 3,
        username: 'josefa',
      },
    ],
  },
];

export const GroupsInfo = () => {
  const [groups, setGroups] = useState([])
  const [showCreate, setShowCreate] = useState(false);
  const [queryparams, setQueryParams] = useSearchParams();


  const fetchGroups = async() => {
    const response = await getGroups()
    const fetchedGroups = await response.json()
    setGroups(fetchedGroups.data)
  }

  const groupSuccessfullyCreated = () => {
    setShowCreate(false) 
    fetchGroups()
  }
  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <>
      <button
        className='mx-2  mt-4 pb-2'
        onClick={() => {
          queryparams.delete('group');
          setQueryParams(queryparams);
        }}
      >
        <span
          className={`
      text-lg px-2 font-medium transition
      ${!queryparams.get('group') ? 'border-l-2 border-purple-500 text-purple-500' : 'text-slate-800 hover:text-purple-500'}
      `}
        >
          Only you
        </span>
      </button>

      <span className='flex justify-between mx-2 px-2 pt-2 pb-2 border-b border-purple-500'>
        <h2 className='text-lg text-slate-800 font-medium '>Groups</h2>
        <button onClick={() => setShowCreate(!showCreate)} className='text-slate-800 transition hover:text-purple-500'>
          <PlusIcon className='h-6 w-6'></PlusIcon>
        </button>
        <Modal open={showCreate} setOpen={setShowCreate} title={'Create Group'} onClose={() => setShowCreate(false)}>
          <GroupCreation onSuccesfullSubmit={groupSuccessfullyCreated} onCancel={() => setShowCreate(false)} />
        </Modal>
      </span>

      <ul className='mx-2 px-2 pt-2'>
        {groups.map((group) => (
          <li
            key={group._id}
            className={`text-md font-normal
              ${
                queryparams.get('group') === String(group._id)
                  ? 'text-purple-500 border-l-2 border-purple-500 under pointer-events-none px-1'
                  : 'text-slate-800 hover:text-purple-500 px-1'
              }
              `}
          >
            <button
              onClick={() => {
                queryparams.set('group', group._id);
                setQueryParams(queryparams);
              }}
            >
              {' '}
              {group.name}{' '}
            </button>
          </li>
        ))}
      </ul>

      {queryparams.get('group') ? (
        <>
          <span className='flex my-4 mx-2 border-b border-slate-300 shadow-sm' />

          <GroupMembers group={groups.filter((g) => String(g._id) === queryparams.get('group'))[0]} />
        </>
      ) : null}
    </>
  );
};
const GroupMembers = ({ group }) => {
  return (
    <>
      <span className='flex justify-between mx-2 px-2 pt-4 pb-2 border-b border-purple-500'>
        <h2 className='text-xltext-slate-800 font-medium '>Members</h2>
        <button className='text-slate-800 transition hover:text-purple-500'>
          <PlusIcon className='h-6 w-6'></PlusIcon>
        </button>
      </span>

      <ul className='mx-2 px-2 pt-2'>
        {group?.members?.map((member) => (
          <li key={member.id} className={`text-md font-normal text-slate-800 px-1`}>
            {member.username}
          </li>
        )) ?? ['No members']}
      </ul>
    </>
  );
};
