import {
  CREATE_EVENT_MODAL_OPENED,
  CREATE_EVENT_MODAL_CLOSED,
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
    default:
      return state;
  }
}
