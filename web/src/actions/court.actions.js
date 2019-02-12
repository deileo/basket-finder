import {
  CHANGE_COURT_TYPE,
  FETCH_COURT,
  FETCH_COURTS,
  LOADING_EVENTS_ENDED,
  LOADING_EVENTS_STARTED,
  LOADING_MAP_ENDED,
  LOADING_MAP_STARTED
} from "./types";
import {
  fetchCourts,
  getCourt,
} from '../services/courtService';

export const fetchCourtsAction = (type) => {
  return function(dispatch) {
    dispatch({ type: LOADING_MAP_STARTED });

    return fetchCourts(type)
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
        dispatch({ type: LOADING_MAP_ENDED });
      });
  };
};

export const fetchCourtById = (type, courtId) => {
  return function(dispatch) {
    dispatch({ type: LOADING_EVENTS_STARTED });

    return getCourt(type, courtId)
      .then(response => {
        return dispatch({ type: FETCH_COURT, payload: response.data });
      })
      .catch(error => {
        if (error) {
          console.error(error);
        }
        return Promise.reject({});
      })
      .finally(() => {
        dispatch({ type: LOADING_EVENTS_ENDED });
      });
  };
};

export const setCourtToNull = () => {
  return function(dispatch) {
    dispatch({type: FETCH_COURT, payload: null});
  };
};

export const changeCourtType = (type) => {
  return function (dispatch) {
    dispatch({type: CHANGE_COURT_TYPE, payload: type})
  }
};
