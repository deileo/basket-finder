import {
  CREATE_EVENT,
  CREATE_EVENT_ERROR,
  JOIN_EVENT,
  GET_EVENTS,
  RESET_EVENT_CREATION,
  REMOVE_EVENT_ERRORS,
  LEAVE_EVENT,
  GET_USER_CREATED_EVENTS,
  GET_USER_JOINED_EVENTS,
  DELETE_EVENT, EDIT_EVENT,
  RELOAD_EVENTS
} from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case CREATE_EVENT: {
      return { ...state, created: action.payload, reload: true };
    }
    case EDIT_EVENT: {
      return { ...state, created: action.payload, reload: true };
    }
    case CREATE_EVENT_ERROR: {
      return {...state, errors: action.payload, created: false, reload: false};
    }
    case JOIN_EVENT: {
      return { ...state, joined: true, reload: true };
    }
    case LEAVE_EVENT: {
      return { ...state, joined: false, reload: true };
    }
    case DELETE_EVENT: {
      return { ...state, joined: false, reload: true };
    }
    case GET_EVENTS: {
      return { ...state, events: action.payload, reload: false };
    }
    case GET_USER_CREATED_EVENTS: {
      return { ...state, userCreatedEvents: action.payload, reload: false };
    }
    case GET_USER_JOINED_EVENTS: {
      return { ...state, userJoinedEvents: action.payload, reload: false };
    }
    case RESET_EVENT_CREATION: {
      return { ...state, created: false, reload: false };
    }
    case REMOVE_EVENT_ERRORS: {
      return { ...state, errors: null, reload: false}
    }
    case RELOAD_EVENTS: {
      return { ...state, reload: true}
    }
    default:
      return state;
  }
}
