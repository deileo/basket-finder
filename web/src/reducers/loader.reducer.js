import { LOADING_STARTED, LOADING_ENDED } from '../actions/types';

const loaderState = {
  isLoading: false
};

export default function(state = loaderState, action) {
  switch (action.type) {
    case LOADING_STARTED: {
      return { ...state, isLoading: true };
    }
    case LOADING_ENDED: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
}
