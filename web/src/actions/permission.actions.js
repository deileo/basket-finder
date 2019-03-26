import {
  sendPermissionRequest,
} from '../services/permissionService';

export const sendPermissionRequestAction = (requestData, token) => {
  return function(dispatch) {
    return sendPermissionRequest(requestData, token)
      .then(response => {
        if (response.status === 201) {
          console.log(response);
        }
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};


const showConsoleError = (error) => {
  if (error) {
    console.error(error);
  }

  return Promise.reject({});
};