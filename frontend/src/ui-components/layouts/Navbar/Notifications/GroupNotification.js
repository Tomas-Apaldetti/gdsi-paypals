import { Modal } from 'ui-components/modal/Modal';
import { useNotifications } from 'context/NotificationContextProvider';
import { useState } from 'react';
import Button from 'ui-components/button/Button';
import { acceptInvite, denyInvite } from 'services/groups';

export const GroupNotification = ({ notification, invite }) => {
  const [showDecision, setShowDecision] = useState(false);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { remove } = useNotifications();

  const handleDecine = async (groupId, inviteId) => {
    try {
      const response = await denyInvite(groupId, inviteId);
      if(!response.ok){
        throw new Error("equisde");
      }
      setShowDecision(false);
      remove(notification);
    } catch (e) {
      setError(e.message);
    } finally{
      setSubmitting(false);
    }
  };

  const handleAccept = async (groupId, inviteId) => {
    try {
      const response = await acceptInvite(groupId, inviteId);
      if(!response.ok){
        throw new Error("equisde");
      }
      setShowDecision(false);
      remove(notification);
    } catch (e) {
      setError(e.message);
    } finally{
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        className='text-start px-4 py-2 w-full hover:bg-purple-500 border border-slate-200 group'
        onClick={(e) => {
          e.preventDefault();
          setShowDecision(true);
        }}
      >
        <h2 className='text-sm font-medium tracking-wider group-hover:text-slate-50 text-purple-500'>
          {`${invite.createdBy.username} invited you to ${notification.data.name}`}
        </h2>
        <p className='text-sm font-extralight text-slate-500 group-hover:text-slate-200'>{notification.data.description}</p>
      </button>
      <Modal
        open={showDecision}
        setOpen={setShowDecision}
        onClose={() => {
          setShowDecision(false);
        }}
      >
        <div className='w-96 max-h-92 px-4'>
          <p className='text-md font-semibold text-red-400 text-center'>{error}</p>
          <h2 className='text-lg font-bold text-purple-500 max-w-80 pb-2'>{`${invite.createdBy.username} invited you to join ${notification.data.name}`}</h2>
          <p className='text-md font-light text-slate-500'>{notification.data.description}</p>
          <div className='pt-8 flex gap-4'>
            <Button
              secondary
              type='button'
              onClick={async (e) => {
                e.preventDefault();
                await handleDecine(notification.data._id, invite._id);
              }}
              disabled={submitting}
            >
              Decline
            </Button>
            <Button
              type='button'
              onClick={async (e) => {
                e.preventDefault();
                await handleAccept(notification.data._id, invite._id);
              }}
              disabled={submitting}
            >
              Accept
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
