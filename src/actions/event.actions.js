import { CREATE_EVENT, JOIN_EVENT } from './types';

export const createEventAction = () => {
  return {
    type: CREATE_EVENT
  };
};

export const joinEventAction = () => {
  return {
    type: JOIN_EVENT
  };
};