import {checkUser, disableUser, enableUser, getAllUsers} from "../services/userService";
import {
  GET_USER, GET_USERS,
  LOADING_EVENTS_ENDED,
  DISABLE_USER,
  ENABLE_USER,
  RESET_RELOAD_USER_TYPE, FLASH_MESSAGE, LOADING_EVENTS_STARTED
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

export const disableUserAction = (user) => {
  return function(dispatch) {
    return disableUser(user)
      .then(response => {
        if (response.status === 200) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Vartotojas užblokuotas!', variant: 'success'}});
          return dispatch({ type: DISABLE_USER, payload: response.data });
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const enableUserAction = (user) => {
  return function(dispatch) {
    return enableUser(user)
      .then(response => {
        if (response.status === 200) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Vartotojas aktyvuotas!', variant: 'success'}});
          return dispatch({ type: ENABLE_USER, payload: response.data });
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const getUsersAction = () => {
  return function(dispatch) {
    dispatch({ type: LOADING_EVENTS_STARTED });

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

export const setReloadUsersToFalse = () => {
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
