import {
  CREATE_EVENT_MODAL_OPENED,
  CREATE_EVENT_MODAL_CLOSED,
  MY_EVENT_MODAL_OPENED,
  MY_JOINED_EVENT_MODAL_OPENED,
} from '../actions/types';

const modalState = {
  isCreateEventOpen: false,
  isMyEventOpen: false,
  isMyJoinedEventOpen: false
};

export default function(state = modalState, action) {
  switch (action.type) {
    case CREATE_EVENT_MODAL_OPENED: {
      return { ...state, isCreateEventOpen: true };
    }
    case CREATE_EVENT_MODAL_CLOSED: {
      return { ...state, isCreateEventOpen: false };
    }
    case MY_EVENT_MODAL_OPENED: {
      return { ...state, isMyEventOpen: action.payload };
    }
    case MY_JOINED_EVENT_MODAL_OPENED: {
      return { ...state, isMyJoinedEventOpen: action.payload };
    }
    default:
      return state;
  }
}
