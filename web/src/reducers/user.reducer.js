import { GET_USER } from '../actions/types';

const userState = {
  auth: null,
  isAuthenticated: false
};

export default function(state = userState, action) {
  switch (action.type) {
    case GET_USER: {
      return { ...state, auth: action.payload, isAuthenticated: !!action.payload };
    }
    default:
      return state;
  }
}
