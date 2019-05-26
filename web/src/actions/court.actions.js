import {
  CHANGE_COURT_TYPE, CREATE_COURT, CREATE_COURT_ERROR,
  FETCH_ADMIN_COURTS,
  FETCH_ADMIN_GYM_COURTS,
  FETCH_ADMIN_NEW_COURTS,
  FETCH_COURT,
  FETCH_COURTS,
  FLASH_MESSAGE,
  LOADING_EVENTS_ENDED,
  LOADING_EVENTS_STARTED,
  LOADING_MAP_ENDED,
  LOADING_MAP_STARTED,
  RELOAD_COURTS_TYPE,
  RESET_RELOAD_COURTS_TYPE
} from "./types";
import {
  createCourt,
  deleteCourt,
  disableCourt,
  enableCourt,
  fetchCourts, getAllAdminCourts, getAllAdminGymCourts,
  getCourt, getNewCourts,
} from '../services/courtService';

export const createCourtAction = (courtData, type) => {
  return function(dispatch) {
    return createCourt(courtData, type)
      .then(response => {
        if (response.status === 201) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Aikštelė sukurta!', variant: 'success'}});

          return dispatch({type: CREATE_COURT, payload: response.data});
        }
        if (response.status === 200) {
          return dispatch({ type: CREATE_COURT_ERROR, payload: response.data });
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const fetchCourtsAction = (type) => {
  return function(dispatch) {
    dispatch({ type: LOADING_MAP_STARTED });
    dispatch({ type: LOADING_EVENTS_STARTED });

    return fetchCourts(type)
      .then(response => {
        return dispatch({ type: FETCH_COURTS, payload: response.data });
      })
      .catch(error => {
        return showConsoleError(error);
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
        return showConsoleError(error);
      });
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
        return showConsoleError(error);
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
        return showConsoleError(error);
      })
      .finally(() => {
        dispatch({ type: LOADING_EVENTS_ENDED });
      });
  };
};

export const fetchAdminNewCourtsAction = () => {
  return function(dispatch) {
    dispatch({ type: LOADING_EVENTS_STARTED });

    return getNewCourts()
      .then(response => {
        if (response.status === 200) {
          return dispatch({type: FETCH_ADMIN_NEW_COURTS, payload: response.data});
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

export const enableCourtAction = (type, court) => {
  return function(dispatch) {
    return enableCourt(type, court.id)
      .then(response => {
        if (response.status === 200) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Aikštelė aktyvuota!', variant: 'success'}});

          return dispatch({type: RELOAD_COURTS_TYPE, payload: type});
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const disableCourtAction = (type, court) => {
  return function(dispatch) {
    return disableCourt(type, court.id)
      .then(response => {
        if (response.status === 200) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Aikštelė užblokuota!', variant: 'success'}});

          return dispatch({type: RELOAD_COURTS_TYPE, payload: type});
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const handleDeleteAction = (type, court) => {
  return function(dispatch) {
    return deleteCourt(type, court.id)
      .then(response => {
        if (response.status === 200) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Aikštelė pašalinta!', variant: 'success'}});

          return dispatch({type: RELOAD_COURTS_TYPE, payload: type});
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const setReloadToFalse = () => {
  return function(dispatch) {
    dispatch({type: RESET_RELOAD_COURTS_TYPE});
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

const showConsoleError = (error) => {
  if (error) {
    console.error(error);
  }

  return Promise.reject({});
};
