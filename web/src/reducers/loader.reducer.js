import { LOADING_MAP_STARTED, LOADING_MAP_ENDED, LOADING_EVENTS_STARTED, LOADING_EVENTS_ENDED } from '../actions/types';

const loaderState = {
  isMapLoading: false,
  isEventsLoading: false,
};

export default function(state = loaderState, action) {
  switch (action.type) {
    case LOADING_MAP_STARTED: {
      return { ...state, isMapLoading: true };
    }
    case LOADING_MAP_ENDED: {
      return { ...state, isMapLoading: false };
    }
    case LOADING_EVENTS_STARTED: {
      return { ...state, isEventsLoading: true };
    }
    case LOADING_EVENTS_ENDED: {
      return { ...state, isEventsLoading: false };
    }
    default:
      return state;
  }
}
