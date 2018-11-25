import { CREATE_EVENT, CREATE_EVENT_ERROR, JOIN_EVENT } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case CREATE_EVENT: {
      return { ...state, created: true };
    }
    case CREATE_EVENT_ERROR: {
      return {...state, errors: action.payload, created: false};
    }
    case JOIN_EVENT: {
      return { ...state, joined: action.payload };
    }
    default:
      return state;
  }
}
