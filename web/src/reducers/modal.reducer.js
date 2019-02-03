import { MODAL_OPENED, MODAL_CLOSED } from '../actions/types';

const modalState = {
  isOpen: false
};

export default function(state = modalState, action) {
  switch (action.type) {
    case MODAL_OPENED: {
      return { ...state, isOpen: true };
    }
    case MODAL_CLOSED: {
      return { ...state, isOpen: false };
    }
    default:
      return state;
  }
}
