import {FETCH_COURTS, FETCH_COURT, CHANGE_COURT_TYPE} from '../actions/types';

const navState = {
  data: []
};

export default function(state = navState, action) {
  switch (action.type) {
    case FETCH_COURTS: {
      return { ...state, data: action.payload };
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
