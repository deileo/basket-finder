import {
  sendPermissionRequest,
  getGymCourtPermission, getPermissions, sendPermissionRequestApproval, deletePermission,
} from '../services/permissionService';
import {
  FLASH_MESSAGE,
  PERMISSION_REQUEST_CREATED,
  PERMISSION_REQUEST_ERRORS,
  RESET_CREATED_REQUEST,
  PERMISSION_GYM_COURT, PERMISSIONS_ALL,
  PERMISSION_REQUEST_APPROVED, PERMISSION_DELETE, LOADING_EVENTS_STARTED, LOADING_EVENTS_ENDED,
} from "./types";

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

export const approvePermissionRequestAction = (permissionId, requestData, token) => {
  return function(dispatch) {
    return sendPermissionRequestApproval(permissionId, requestData, token)
      .then(response => {
        if (response.status === 201) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Permission request approved!', variant: 'success'}});

          return dispatch({type: PERMISSION_REQUEST_APPROVED});
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

export const deletePermissionAction = (permissionId, token) => {
  return function(dispatch) {
    return deletePermission(permissionId, token)
      .then(response => {
        if (response.status === 200) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Permission deleted!', variant: 'success'}});

          return dispatch({type: PERMISSION_DELETE});
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const getGymCourtPermissionAction = (gymCourtId, token) => {
  return function(dispatch) {
    return getGymCourtPermission(gymCourtId, token)
      .then(response => {
        if (response.status === 200) {
          return dispatch({type: PERMISSION_GYM_COURT, payload: response.data});
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const getPermissionsAction = (token) => {
  return function(dispatch) {
    dispatch({ type: LOADING_EVENTS_STARTED });

    return getPermissions(token)
      .then(response => {
        if (response.status === 200) {
          return dispatch({type: PERMISSIONS_ALL, payload: response.data});
        }
      })
      .catch(error => {
        return showConsoleError(error);
      })
      .finally(() => {
        dispatch({ type: LOADING_EVENTS_ENDED });
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
