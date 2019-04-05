import {FETCH_COURTS, FETCH_COURT, CHANGE_COURT_TYPE, FETCH_ADMIN_COURTS, FETCH_ADMIN_GYM_COURTS} from '../actions/types';

const navState = {
  data: [],
  courts: [],
  gymCourts: [],
  court: null,
};

export default function(state = navState, action) {
  switch (action.type) {
    case FETCH_COURTS: {
      return { ...state, data: action.payload };
    }
    case FETCH_ADMIN_COURTS: {
      return { ...state, courts: action.payload };
    }
    case FETCH_ADMIN_GYM_COURTS: {
      return { ...state, gymCourts: action.payload };
    }
    case FETCH_COURT: {
      return { ...state, court: action.payload };
    }
    case CHANGE_COURT_TYPE: {
      return { ...state, type: action.payload };
    }
    default:
      return state;
  }
}
