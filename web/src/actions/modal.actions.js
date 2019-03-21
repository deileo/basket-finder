import {
  CREATE_EVENT_MODAL_OPENED,
  CREATE_EVENT_MODAL_CLOSED, TYPE_COURT,
  CREATE_GYM_EVENT_MODAL_OPENED,
} from './types';

export const closeCreateEventModalAction = (type = TYPE_COURT) => {
  return {
    type: CREATE_EVENT_MODAL_CLOSED
  };
};

export const openCreateEventModalAction = (type = TYPE_COURT) => {
  if (type === TYPE_COURT) {
    return {
      type: CREATE_EVENT_MODAL_OPENED
    };
  }

  return {
    type: CREATE_GYM_EVENT_MODAL_OPENED
  }
};