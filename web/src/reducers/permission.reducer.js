import {
  PERMISSION_GYM_COURT,
  PERMISSION_REQUEST_CREATED,
  PERMISSION_REQUEST_ERRORS,
  PERMISSIONS_ALL,
  RESET_CREATED_REQUEST,
  PERMISSION_REQUEST_APPROVED,
  PERMISSION_DELETE
} from "../actions/types";

const defaultState = {
  errors: [],
  created: false,
  reload: false,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case PERMISSION_REQUEST_CREATED:
      return { ...state, created: true, errors: [], reload: true };
    case PERMISSION_REQUEST_APPROVED:
      return { ...state, errors: [], reload: true };
    case PERMISSION_REQUEST_ERRORS:
      return { ...state, created: false, errors: action.payload };
    case PERMISSION_GYM_COURT:
      return { ...state, created: false, permission: action.payload, reload: true };
    case RESET_CREATED_REQUEST:
      return { ...state, created: false, reload: false, errors: [] };
    case PERMISSIONS_ALL:
      return { ...state, permissions: action.payload };
    case PERMISSION_DELETE:
      return { ...state, reload: true};
    default:
      return state;
  }
}
