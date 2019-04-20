import {checkUser, getAllUsers} from "../services/userService";
import {
  GET_USER, GET_USERS,
  LOADING_EVENTS_ENDED,
  LOADING_EVENTS_STARTED,
  RESET_RELOAD_USER_TYPE
} from "./types";

export const checkUserAction = userToken => {
  return function(dispatch) {
    return checkUser(userToken)
      .then(response => {
        if (response.status === 200) {
          return dispatch({ type: GET_USER, payload: response.data });
        } else {
          return dispatch({ type: GET_USER, payload: null });
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const getUsersAction = () => {
  return function(dispatch) {
    // dispatch({ type: LOADING_EVENTS_STARTED });

    return getAllUsers()
      .then(response => {
        return dispatch({ type: GET_USERS, payload: response.data });
      })
      .catch(error => {
        return showConsoleError(error);
      })
      .finally(() => {
        dispatch({ type: LOADING_EVENTS_ENDED });
      })
  };
};

export const setReloadToFalse = () => {
  return function(dispatch) {
    dispatch({type: RESET_RELOAD_USER_TYPE});
  };
};

export const logoutUser = () => {
  return function(dispatch) {
    return dispatch({type: GET_USER, payload: null});
  }
};

const showConsoleError = (error) => {
  if (error) {
    console.error(error);
  }

  return Promise.reject({});
};
