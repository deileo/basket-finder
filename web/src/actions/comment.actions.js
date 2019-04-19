import {
  NEW_COMMENT,
  GET_COMMENTS,
  RESET_COMMENT_RELOAD,
  LOADING_COMMENTS_ENDED,
  LOADING_COMMENTS_STARTED
} from "./types";
import {
  createCourtComment, createEventComment,
  getCourtComments, getEventComments
} from '../services/commentService';

export const createCourtCommentAction = (commentData, court, type) => {
  return function (dispatch) {
    return createCourtComment(commentData, court, type)
      .then(response => {
        return dispatch({type: NEW_COMMENT})
      })
      .catch(error => {
        return showConsoleError(error);
      });
  }
};

export const createEventCommentAction = (commentData, event, type) => {
  return function (dispatch) {
    return createEventComment(commentData, event, type)
      .then(response => {
        return dispatch({type: NEW_COMMENT})
      })
      .catch(error => {
        return showConsoleError(error);
      });
  }
};

export const getCourtCommentsAction = (court, type) => {
  return function (dispatch) {
    dispatch({ type: LOADING_COMMENTS_STARTED });

    return getCourtComments(court, type)
      .then(response => {
        return dispatch({type: GET_COMMENTS, payload: response.data})
      })
      .catch(error => {
        return showConsoleError(error);
      })
      .finally(() => {
        dispatch({ type: LOADING_COMMENTS_ENDED });
      });
  }
};

export const getEventCommentsAction = (event, type) => {
  return function (dispatch) {
    dispatch({ type: LOADING_COMMENTS_STARTED });

    return getEventComments(event, type)
      .then(response => {
        return dispatch({type: GET_COMMENTS, payload: response.data})
      })
      .catch(error => {
        return showConsoleError(error);
      })
      .finally(() => {
        dispatch({ type: LOADING_COMMENTS_ENDED });
      });
  }
};

export const resetCourtCommentsAction = () => {
  return function (dispatch) {
    return dispatch({type: RESET_COMMENT_RELOAD})
  }
};

const showConsoleError = (error) => {
  if (error) {
    console.error(error);
  }

  return Promise.reject({});
};
