import {
  CREATE_EVENT_MODAL_OPENED,
  CREATE_EVENT_MODAL_CLOSED,
  CREATE_GYM_EVENT_MODAL_OPENED,
} from '../actions/types';

const modalState = {
  isCreateEventOpen: false,
  isCreateGymEventOpen: false,
};

export default function(state = modalState, action) {
  switch (action.type) {
    case CREATE_EVENT_MODAL_OPENED: {
      return { ...state, isCreateEventOpen: true };
    }
    case CREATE_GYM_EVENT_MODAL_OPENED: {
      return { ...state, isCreateGymEventOpen: true };
    }
    case CREATE_EVENT_MODAL_CLOSED: {
      return { ...state, isCreateEventOpen: false, isCreateGymEventOpen: false };
    }
    default:
      return state;
  }
}
