import React from 'react';
import { GroupNotification } from './GroupNotification';

const mapper = {
  GROUP_REQUEST: (notification) => renderGroupRequestNotification(notification),
};

function renderGroupRequestNotification(groupNotification){
  return <GroupNotification notification={groupNotification} invite={groupNotification.data.invite} />
}

export const notificationRenderer = (notifications) => {
  return notifications.map(notification => {
    if (mapper[notification.type]){
      return mapper[notification.type](notification)
    }
    return []
  }).flat();
}


