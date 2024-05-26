import React, { createContext, useEffect, useReducer} from 'react';
import { notifications } from './notifications.test';

const NotificationContext = createContext();

const initialState = {
  subscribers: {},
  notifications: [],
}

const actions = {
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUSCRIBE: 'UNSUSCRIBE',
  REMOVE: 'REMOVE',
  ADD: 'ADD'
}

const actors = {
  SUBSCRIBE: function(state, action){
    let current = state.subscribers[action.interest];
    if(!current){
      current = [{id: action.id, cb: action.cb}]
    }else{
      current = [
        ...current,
        {id: action.id, cb: action.cb}
      ]
    }

    return {
      ...state,
      subscribers: {
        ...state.subscribers,
        [action.interest]: current
      }
    }
  },
  UNSUSCRIBE: function(state, action){
    return {
      ...state,
      subscribers:{
        ...state.subscribers,
        [action.interest]: state.subscribers[action.interest]?.filter(sub => sub.id !== action.id)
      }
    }
  },
  REMOVE: function(state, action){
    const newState = {
      ...state,
      notifications: state.notifications.filter((notification) => notification !== action.notification)
    };
    state.subscribers[action.notification.notificationType]?.forEach(sub => sub.cb())
    return newState;
  },
  ADD: function(state, action){
    return {
      ...state,
      notifications: action.notifications
    }
  }
}
function reducer(state, action){
  const actor = actors[action.type];
  if(!actor) return state;
  return actor(state, action)
}


export const NotificationProvider = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getNotifications(){
      dispatch({
        type: actions.ADD,
        notifications: notifications
      })
    }

    const id = setInterval(async () => {
      await getNotifications()
    }, 15000)

    getNotifications()
    return () => clearInterval(id)
  }, [])

  const value = {
    notifications: state.notifications,
    subscribe: (interest, id, cb) => {
      dispatch({
        type: actions.SUBSCRIBE,
        id,
        cb,
        interest
      })
    },
    unsuscribe: (interest, id) => {
      dispatch({
        type: actions.UNSUSCRIBE,
        id,
        interest
      })
    },
    remove: (notification) => {
      dispatch({
        type: actions.REMOVE,
        notification
      })
    }
  }
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
