import {
  CHANGE_COURT_TYPE, FETCH_ADMIN_COURTS, FETCH_ADMIN_GYM_COURTS,
  FETCH_COURT,
  FETCH_COURTS,
  LOADING_EVENTS_ENDED,
  LOADING_EVENTS_STARTED,
  LOADING_MAP_ENDED,
  LOADING_MAP_STARTED
} from "./types";
import {
  fetchCourts, getAllAdminCourts, getAllAdminGymCourts,
  getCourt,
} from '../services/courtService';

export const fetchCourtsAction = (type) => {
  return function(dispatch) {
    dispatch({ type: LOADING_MAP_STARTED });
    dispatch({ type: LOADING_EVENTS_STARTED });

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
        dispatch({ type: LOADING_EVENTS_ENDED });
      });
  };
};


export const fetchCourtById = (type, courtId) => {
  return function(dispatch) {

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
  };
};

export const fetchAdminCourtsAction = () => {
  return function(dispatch) {
    dispatch({ type: LOADING_EVENTS_STARTED });

    return getAllAdminCourts()
      .then(response => {
        return dispatch({ type: FETCH_ADMIN_COURTS, payload: response.data });
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

export const fetchAdminGymCourtsAction = () => {
  return function(dispatch) {
    dispatch({ type: LOADING_EVENTS_STARTED });

    return getAllAdminGymCourts()
      .then(response => {
        return dispatch({ type: FETCH_ADMIN_GYM_COURTS, payload: response.data });
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
