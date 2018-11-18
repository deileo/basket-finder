import { CLOSE_MENU, OPEN_MENU } from '../actions/types';

const navState = {
  isMenuOpen: false
};

export default function(state = navState, action) {
  switch (action.type) {
    case CLOSE_MENU: {
      return { ...state, isMenuOpen: false };
    }
    case OPEN_MENU: {
      return { ...state, isMenuOpen: true };
    }
    default:
      return state;
  }
}
