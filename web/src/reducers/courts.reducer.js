import {FETCH_COURTS, FETCH_COURT} from '../actions/types';

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
    default:
      return state;
  }
}
