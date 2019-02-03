import {FETCH_COURTS} from '../actions/types';

const navState = {
  data: []
};

export default function(state = navState, action) {
  switch (action.type) {
    case FETCH_COURTS: {
      return { ...state, data: action.payload };
    }
    default:
      return state;
  }
}
