import {
  CREATE_EVENT_MODAL_OPENED,
  CREATE_EVENT_MODAL_CLOSED,
  JOIN_EVENT_MODAL_OPENED,
  JOIN_EVENT_MODAL_CLOSED
} from '../actions/types';

const modalState = {
  isCreateEventOpen: false,
  isJoinEventOpen: false
};

export default function(state = modalState, action) {
  switch (action.type) {
    case CREATE_EVENT_MODAL_OPENED: {
      return { ...state, isCreateEventOpen: true };
    }
    case CREATE_EVENT_MODAL_CLOSED: {
      return { ...state, isCreateEventOpen: false };
    }
    case JOIN_EVENT_MODAL_OPENED: {
      return { ...state, isJoinEventOpen: true };
    }
    case JOIN_EVENT_MODAL_CLOSED: {
      return { ...state, isJoinEventOpen: false };
    }
    default:
      return state;
  }
}
