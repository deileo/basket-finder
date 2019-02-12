import {
  CREATE_EVENT,
  CREATE_EVENT_ERROR,
  GET_EVENTS,
  FLASH_MESSAGE,
  JOIN_EVENT,
  MODAL_CLOSED, LOADING_EVENTS_STARTED, LOADING_EVENTS_ENDED, RESET_EVENT_CREATION
} from './types';
import {createEvent, joinEvent, getEvents} from '../services/eventService';

export const createEventAction = createEventData => {
  return function(dispatch) {
    return createEvent(createEventData)
      .then(response => {
        if (response.status === 201) {
          dispatch({type: MODAL_CLOSED, payload: {isOpen: false}});
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Event created!', variant: 'success'}});

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

export const getEventsAction = () => {
  return function(dispatch) {
    dispatch({ type: LOADING_EVENTS_STARTED });

    return getEvents()
      .then(response => {
        return dispatch({ type: GET_EVENTS, payload: response.data });
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

export const resetEventCreationAction = () => {
  return function(dispatch) {
    dispatch({type: RESET_EVENT_CREATION});
  }
};
