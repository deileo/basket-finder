import {FETCH_COURT, FETCH_COURTS, LOADING_ENDED, LOADING_STARTED} from "./types";
import {
  fetchCourts,
  getCourt,
} from '../services/courtService';

export const fetchCourtsAction = () => {
  return function(dispatch) {
    dispatch({ type: LOADING_STARTED });

    return fetchCourts()
      .then(response => {
        return dispatch({ type: FETCH_COURTS, payload: response.data });
      })
      .catch(error => {
        if (error) {
          console.error(error);
        }
        return Promise.reject({});
      })
      .finally(() => {
        dispatch({ type: LOADING_ENDED });
      });
  };
};

export const fetchCourtById = (courtId) => {
  return function(dispatch) {
    return getCourt(courtId)
      .then(response => {
        return dispatch({ type: FETCH_COURT, payload: response.data });
      })
      .catch(error => {
        if (error) {
          console.error(error);
        }
        return Promise.reject({});
      })
  };
};
