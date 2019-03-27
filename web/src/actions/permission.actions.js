import {
  sendPermissionRequest,
} from '../services/permissionService';
import {FLASH_MESSAGE, PERMISSION_REQUEST_CREATED, PERMISSION_REQUEST_ERRORS, RESET_CREATED_REQUEST} from "./types";

export const sendPermissionRequestAction = (requestData, token) => {
  return function(dispatch) {
    return sendPermissionRequest(requestData, token)
      .then(response => {
        if (response.status === 201) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Permission request sent!', variant: 'success'}});

          return dispatch({type: PERMISSION_REQUEST_CREATED});
        }
        if (response.status === 200) {
          dispatch({type: PERMISSION_REQUEST_ERRORS, payload: response.data})
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const resetPermisionRequestState = () => {
  return function(dispatch) {
    return dispatch({type: RESET_CREATED_REQUEST});
  }
};


const showConsoleError = (error) => {
  if (error) {
    console.error(error);
  }

  return Promise.reject({});
};