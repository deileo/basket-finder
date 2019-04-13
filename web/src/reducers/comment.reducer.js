import {
} from '../actions/types';
import {NEW_COMMENT} from "../actions/types";
import {GET_COMMENTS} from "../actions/types";
import {RESET_COMMENT_RELOAD} from "../actions/types";

const defaultState = {
  comments: [],
  reload: false,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case NEW_COMMENT: {
      return { ...state, reload: true };
    }
    case GET_COMMENTS: {
      return {...state, comments: action.payload};
    }
    case RESET_COMMENT_RELOAD: {
      return { ...state, reload: false };
    }
    default:
      return state;
  }
}
