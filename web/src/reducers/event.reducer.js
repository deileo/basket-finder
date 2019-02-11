import { CREATE_EVENT, CREATE_EVENT_ERROR, JOIN_EVENT, GET_EVENTS } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case CREATE_EVENT: {
      return { ...state, created: action.payload };
    }
    case CREATE_EVENT_ERROR: {
      return {...state, errors: action.payload, created: false};
    }
    case JOIN_EVENT: {
      return { ...state, joined: action.payload };
    }
    case GET_EVENTS: {
      return { ...state, events: action.payload };
    }
    default:
      return state;
  }
}
