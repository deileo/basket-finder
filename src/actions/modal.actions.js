import { MODAL_OPENED, MODAL_CLOSED } from './types';

export const closeModalAction = () => {
  return {
    type: MODAL_CLOSED
  };
};

export const openModalAction = () => {
  return {
    type: MODAL_OPENED
  };
};
