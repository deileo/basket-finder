import { CREATE_EVENT, JOIN_EVENT } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case CREATE_EVENT: {
      return { ...state, created: action.payload };
    }
    case JOIN_EVENT: {
      return { ...state, joined: action.payload };
    }
    default:
      return state;
  }
}
