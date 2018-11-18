import { CLOSE_MENU, OPEN_MENU } from './types';

export const closeMenuAction = () => {
  return {
    type: CLOSE_MENU
  };
};

export const openMenuAction = () => {
  return {
    type: OPEN_MENU
  };
};
