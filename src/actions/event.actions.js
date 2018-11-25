import {CREATE_EVENT, CREATE_EVENT_ERROR, JOIN_EVENT} from './types';

export const createEventAction = () => {
  return {
    type: CREATE_EVENT
  };
};

export const createEventError = () => {
  return {
    type: CREATE_EVENT_ERROR
  };
};

export const joinEventAction = () => {
  return {
    type: JOIN_EVENT
  };
};