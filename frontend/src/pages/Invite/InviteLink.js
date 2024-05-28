import { Modal } from 'ui-components/modal/Modal';
import React from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import BaseBackground from 'ui-components/layouts/BaseBackground';
import Button from 'ui-components/button/Button';
import { Loading } from 'logic-components/Loading';
import { useAPIData } from 'hooks/useAPIData';
import { acceptInviteLink, getGroupFromInvite } from 'services/groups';

export const InviteLink = () => {
  const [queryparams] = useSearchParams();
  const navigate = useNavigate();
  const { data: groupInfo, loading, error } = useAPIData(async () => await getGroupFromInvite(queryparams.get('invite')));

  if (!queryparams.get('invite')) {
    return <Navigate to={'/'} />;
  }

  const acceptInvite = async () => {
    try{
      await acceptInviteLink(groupInfo.id, queryparams.get('invite'))
    }catch(e){
      console.error(e)
    }
    navigate('/')
  };

  return (
    <>
      <BaseBackground />
      <Loading loading={loading} error={error}>
        <Modal
          open={true}
          setOpen={() => {}}
          onClose={() => {
            navigate('/');
          }}
        >
          <div className='max-h-96 w-92 sm:w-112 md:w-128 flex flex-col justify-center px-4 py-2'>
            <>
              <h1 className='text-xl mr-4 tracking-wide font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-indigo-600'>
                {`You are about to join ${groupInfo?.name}`}
              </h1>
              <p className='pt-4 text-lg font-light'>{groupInfo?.description}</p>

              <div className='flex pt-8 gap-4'>
                <Button
                  secondary
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/');
                  }}
                >
                  Nope
                </Button>
                <Button
                  onClick={async(e) => {
                    e.preventDefault();
                    await acceptInvite();
                  }}
                >
                  Let's go
                </Button>
              </div>
            </>
          </div>
        </Modal>
      </Loading>
    </>
  );
};
