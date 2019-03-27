import {PERMISSION_REQUEST_CREATED, PERMISSION_REQUEST_ERRORS, RESET_CREATED_REQUEST} from "../actions/types";

const defaultState = {
  errors: [],
  created: false,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case PERMISSION_REQUEST_CREATED:
      return { ...state, created: true, errors: [] };
    case PERMISSION_REQUEST_ERRORS:
      return { ...state, created: false, errors: action.payload };
    case RESET_CREATED_REQUEST:
      return { ...state, created: false, errors: [] };
    default:
      return state;
  }
}
