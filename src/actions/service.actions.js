import {
  fetchCourts,
  createEvent,
  joinEvent
} from '../services/services';
import {
  FETCH_COURTS,
  CREATE_EVENT,
  CREATE_EVENT_ERROR,
  JOIN_EVENT,
  LOADING_STARTED,
  LOADING_ENDED
} from './types';

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

export const createEventAction = createEventData => {
  return function(dispatch) {
    return createEvent(createEventData)
      .then(response => {
        if (response.status === 201) {
          return dispatch({type: CREATE_EVENT, payload: response.data});
        }
        if (response.status === 200) {
          return dispatch({ type: CREATE_EVENT_ERROR, payload: response.data });
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

export const joinEventAction = joinEventData => {
  return function(dispatch) {
    return joinEvent(joinEventData)
      .then(response => {
        return dispatch({ type: JOIN_EVENT, payload: response.data });
      })
      .catch(error => {
        if (error) {
          console.log(error);
        }
        return Promise.reject({});
      });
  };
};
