import {
  CREATE_EVENT,
  CREATE_EVENT_ERROR,
  JOIN_EVENT,
  GET_EVENTS,
  RESET_EVENT_CREATION,
  REMOVE_EVENT_ERRORS,
  LEAVE_EVENT
} from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case CREATE_EVENT: {
      return { ...state, created: action.payload };
    }
    case CREATE_EVENT_ERROR: {
      return {...state, errors: action.payload, created: false};
    }
    case JOIN_EVENT: {
      return { ...state, joined: true };
    }
    case LEAVE_EVENT: {
      return { ...state, joined: false };
    }
    case GET_EVENTS: {
      return { ...state, events: action.payload };
    }
    case RESET_EVENT_CREATION: {
      return { ...state, created: false };
    }
    case REMOVE_EVENT_ERRORS: {
      return { ...state, errors: null}
    }
    default:
      return state;
  }
}
