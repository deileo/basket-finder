import {
  FETCH_COURTS,
  FETCH_COURT,
  CHANGE_COURT_TYPE,
  FETCH_ADMIN_COURTS,
  FETCH_ADMIN_GYM_COURTS,
  RELOAD_COURTS_TYPE,
  RESET_RELOAD_COURTS_TYPE, FETCH_ADMIN_NEW_COURTS, CREATE_COURT, CREATE_COURT_ERROR
} from '../actions/types';

const navState = {
  data: [],
  courts: [],
  gymCourts: [],
  court: null,
  reload: false,
  reloadType: null,
};

export default function(state = navState, action) {
  switch (action.type) {
    case CREATE_COURT: {
      return { ...state, created: action.payload };
    }
    case CREATE_COURT_ERROR: {
      return {...state, errors: action.payload, created: false};
    }
    case FETCH_COURTS: {
      return { ...state, data: action.payload };
    }
    case FETCH_ADMIN_COURTS: {
      return { ...state, courts: action.payload };
    }
    case FETCH_ADMIN_GYM_COURTS: {
      return { ...state, gymCourts: action.payload };
    }
    case FETCH_ADMIN_NEW_COURTS: {
      return { ...state, newCourts: action.payload };
    }
    case FETCH_COURT: {
      return { ...state, court: action.payload };
    }
    case CHANGE_COURT_TYPE: {
      return { ...state, type: action.payload };
    }
    case RELOAD_COURTS_TYPE: {
      return { ...state, reload: true, reloadType: action.payload };
    }
    case RESET_RELOAD_COURTS_TYPE: {
      return { ...state, reload: false };
    }
    default:
      return state;
  }
}
