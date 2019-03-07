import {
  CREATE_EVENT_MODAL_OPENED,
  CREATE_EVENT_MODAL_CLOSED,
} from './types';

export const closeCreateEventModalAction = () => {
  return {
    type: CREATE_EVENT_MODAL_CLOSED
  };
};

export const openCreateEventModalAction = () => {
  return {
    type: CREATE_EVENT_MODAL_OPENED
  };
};
