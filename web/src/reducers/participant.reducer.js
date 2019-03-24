import {ACCEPT_PARTICIPANT, CANCEL_PARTICIPANT, GET_PARTICIPANTS_UNCONFIRMED} from '../actions/types';

const defaultState = {
  unconfirmedParticipants: []
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_PARTICIPANTS_UNCONFIRMED: {
      return { ...state, unconfirmedParticipants: action.payload };
    }
    case ACCEPT_PARTICIPANT: {
      return { ...state, reload: true };
    }
    case CANCEL_PARTICIPANT: {
      return { ...state, reload: true };
    }
    default:
      return state;
  }
}
