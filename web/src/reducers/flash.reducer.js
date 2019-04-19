import {FLASH_MESSAGE} from '../actions/types';

const initialState = {
  isOpen: false,
  message: null,
  variant: null,
  className: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case FLASH_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};
