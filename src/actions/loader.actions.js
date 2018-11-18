import { LOADING_STARTED, LOADING_ENDED } from './types';

export const startLoadingAction = () => {
  return {
    type: LOADING_STARTED
  };
};

export const endLoadingAction = () => {
  return {
    type: LOADING_ENDED
  };
};
