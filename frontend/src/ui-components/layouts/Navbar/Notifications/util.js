import React from 'react';
import { GroupNotification } from './GroupNotification';

const mapper = {
  GROUP_REQUEST: (notification) => renderGroupRequestNotification(notification),
};

function renderGroupRequestNotification(groupNotification){
  console.log("Called with", groupNotification)
  return groupNotification.data.invites.map(invite => {
    return <GroupNotification key={invite._id} notification={groupNotification} invite={invite} />
  })
}

export const notificationRenderer = (notifications) => {
  return notifications.map(notification => {
    if (mapper[notification.type]){
      return mapper[notification.type](notification)
    }
    return []
  }).flat();
}


