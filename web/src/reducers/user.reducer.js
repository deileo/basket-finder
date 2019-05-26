import {GET_USERS, GET_USER, RESET_RELOAD_USER_TYPE, DISABLE_USER, ENABLE_USER} from '../actions/types';

const userState = {
  auth: null,
  isAuthenticated: false,
  users: [],
  reload: false,
};

export default function(state = userState, action) {
  switch (action.type) {
    case GET_USER: {
      return { ...state, auth: action.payload, isAuthenticated: !!action.payload };
    }
    case GET_USERS: {
      return { ...state, users: action.payload, reload: false };
    }
    case DISABLE_USER: {
      return { ...state, reload: true };
    }
    case ENABLE_USER: {
      return { ...state, reload: true };
    }
    case RESET_RELOAD_USER_TYPE: {
      return { ...state, reload: false };
    }
    default:
      return state;
  }
}
