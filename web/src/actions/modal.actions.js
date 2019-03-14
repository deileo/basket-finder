import {
  CREATE_EVENT_MODAL_OPENED,
  CREATE_EVENT_MODAL_CLOSED,
  MY_EVENT_MODAL_OPENED,
  MY_JOINED_EVENT_MODAL_OPENED,
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

export const toggleMyEventModalAction = (isOpen) => {
  return {
    type: MY_EVENT_MODAL_OPENED, payload: isOpen
  }
};

export const toggleMyJoinedEventModalAction = (isOpen) => {
  return {
    type: MY_JOINED_EVENT_MODAL_OPENED, payload: isOpen
  }
};