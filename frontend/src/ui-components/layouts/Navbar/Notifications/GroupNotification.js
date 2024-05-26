import { Modal } from "ui-components/modal/Modal";
import { useNotifications } from "context/NotificationContextProvider";
import { useState } from "react";
import Button from "ui-components/button/Button";

export const GroupNotification = ({ notification, invite }) => {
  console.log("Called with invite: ", invite, "notification", notification)
  const [showDecision, setShowDecision] = useState(false);
  const { remove } = useNotifications();

  const handleDecine = (groupId, inviteId) => {
    setShowDecision(false);
    remove(notification);
    console.log(`Declining ${groupId} - ${inviteId}`);
  };

  const handleAccept = (groupId, inviteId) => {
    setShowDecision(false);
    remove(notification);
    console.log(`Accepting ${groupId} - ${inviteId}`);
  };

  return (
    <>
      <button
        className='text-start px-4 py-2 w-full hover:bg-purple-500 border border-slate-200 group'
        onClick={(e) => {e.preventDefault(); setShowDecision(true)}}
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
          <h2 className='text-lg font-bold text-purple-500 max-w-80 pb-2'>{`${invite.createdBy.username} invited you to join ${notification.data.name}`}</h2>
          <p className='text-md font-light text-slate-500'>{notification.data.description}</p>
          <div className='pt-8 flex gap-4'>
            <Button
              secondary
              type='button'
              onClick={(e) => {
                e.preventDefault();
                handleDecine(notification.data._id, invite._id);
              }}
            >
              Decline
            </Button>
            <Button
              type='button'
              onClick={(e) => {
                e.preventDefault();
                handleAccept(notification.data._id, invite._id);
              }}
            >
              Accept
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
