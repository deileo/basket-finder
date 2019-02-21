import {checkUser} from "../services/userService";
import {GET_USER} from "./types";

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
        if (error) {
          console.error(error);
        }
        return Promise.reject({});
      });
  };
};