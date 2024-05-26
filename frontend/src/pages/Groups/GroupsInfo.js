import { Modal } from 'ui-components/modal/Modal';
import React, { useEffect, useState } from 'react';
import GroupCreation from 'pages/Groups/Creation';
import AddMembersForm from 'pages/Groups/AddMembersForm';
import { PlusIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'react-router-dom';
import { getGroups } from 'services/groups';
import { useAPIData } from 'hooks/useAPIData';
import { Loading } from 'logic-components/Loading';
import { useNotifications } from 'context/NotificationContextProvider';

export const GroupsInfo = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [queryparams, setQueryParams] = useSearchParams();
  const { data: groups, loading, error, setStale } = useAPIData(getGroups, [], null);

  const {subscribe, unsuscribe} = useNotifications();

  useEffect(()=>{
    subscribe('GROUP_REQUEST', 'GROUP-INFO', () => {
      setStale(true)
    })
    return () => unsuscribe('GROUP_REQUEST', 'GROUP-INFO')
  }, [setStale])

  const groupSuccessfullyCreated = () => {
    setShowCreate(false);
    setStale(true);
  };

  const fetchGroupInformation = () => {
    setStale(true)
  }

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

      <Loading loading={loading} error={error}>
        <ul className='mx-2 px-2 pt-2'>
          {groups?.map((group) => (
            <li
              key={group.id}
              className={`text-md font-normal
              ${
                queryparams.get('group') === String(group.id)
                  ? 'text-purple-500 border-l-2 border-purple-500 under pointer-events-none px-1'
                  : 'text-slate-800 hover:text-purple-500 px-1'
                }
              `}
            >
              <button
                onClick={() => {
                  queryparams.set('group', group.id);
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

            <GroupMembers group={groups.filter((g) => String(g.id) === queryparams.get('group'))[0]} onNewMembersAdded={fetchGroupInformation}/>
          </>
        ) : null}
      </Loading>
    </>
  );
};
const GroupMembers = ({ group, onNewMembersAdded }) => {
  const [addMembers, setAddMembers] = useState(false)
  const [queryparams] = useSearchParams();
  const groupId = queryparams.get('group')
  const membersUpdated = () => {
    onNewMembersAdded()
    setAddMembers(false)
  }
  const membersIds = group?.members?.map(x => x.id)

  return (
    <>
      <span className='flex justify-between mx-2 px-2 pt-4 pb-2 border-b border-purple-500'>
        <h2 className='text-xltext-slate-800 font-medium '>Members</h2>
        <button className='text-slate-800 transition hover:text-purple-500' onClick={() => setAddMembers(!addMembers)}>
          <PlusIcon className='h-6 w-6'></PlusIcon>
        </button>
        <Modal open={addMembers} setOpen={setAddMembers} title={'Add Members'} onClose={() => setAddMembers(false)}>
          <AddMembersForm onSuccesfullSubmit={membersUpdated} onCancel={() => setAddMembers(false)} groupId={groupId} existingMembersInGroup={membersIds}/>
        </Modal>
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
