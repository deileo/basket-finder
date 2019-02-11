import {LOADING_MAP_STARTED, LOADING_MAP_ENDED, LOADING_EVENTS_ENDED, LOADING_EVENTS_STARTED} from './types';

export const startMapLoadingAction = () => {
  return {
    type: LOADING_MAP_STARTED
  };
};

export const endMapLoadingAction = () => {
  return {
    type: LOADING_MAP_ENDED
  };
};

export const startEventsLoadingAction = () => {
  return {
    type: LOADING_EVENTS_STARTED
  };
};

export const endEventsLoadingAction = () => {
  return {
    type: LOADING_EVENTS_ENDED
  };
};
