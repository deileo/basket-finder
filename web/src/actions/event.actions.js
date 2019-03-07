import {
  CREATE_EVENT,
  CREATE_EVENT_ERROR,
  GET_EVENTS,
  FLASH_MESSAGE,
  JOIN_EVENT,
  LOADING_EVENTS_STARTED,
  LOADING_EVENTS_ENDED,
  RESET_EVENT_CREATION,
  REMOVE_EVENT_ERRORS,
  CREATE_EVENT_MODAL_CLOSED
} from './types';
import {createEvent, joinEvent, getEvents} from '../services/eventService';

export const createEventAction = (createEventData, type, token) => {
  return function(dispatch) {
    return createEvent(createEventData, type, token)
      .then(response => {
        if (response.status === 201) {
          dispatch({type: CREATE_EVENT_MODAL_CLOSED, payload: {isOpen: false}});
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Event created!', variant: 'success'}});

          return dispatch({type: CREATE_EVENT, payload: response.data});
        }
        if (response.status === 200) {
          return dispatch({ type: CREATE_EVENT_ERROR, payload: response.data });
        }
      })
      .catch(error => {
        return showConsoleError(error);
      });
  };
};

export const joinEventAction = (token, eventId, type) => {
  return function(dispatch) {
    dispatch({ type: LOADING_EVENTS_STARTED });

    return joinEvent(token, eventId, type)
      .then(response => {
        if (response.status === 201) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Event joined!', variant: 'success'}});

          return dispatch({type: JOIN_EVENT, payload: response.data});
        }
      })
      .catch(error => {
        return showConsoleError(error);
      })
      .finally(() => {
        dispatch({ type: LOADING_EVENTS_ENDED });
      })
  };
};

export const getEventsAction = (type, courtId = null) => {
  return function(dispatch) {
    dispatch({ type: LOADING_EVENTS_STARTED });

    return getEvents(type, courtId)
      .then(response => {
        return dispatch({ type: GET_EVENTS, payload: response.data });
      })
      .catch(error => {
        return showConsoleError(error);
      })
      .finally(() => {
        dispatch({ type: LOADING_EVENTS_ENDED });
      })
  };
};

export const resetEventCreationAction = () => {
  return function(dispatch) {
    dispatch({type: RESET_EVENT_CREATION});
  }
};

export const removeEventErrorsAction = () => {
  return function(dispatch) {
    dispatch({type: REMOVE_EVENT_ERRORS});
  }
};

const showConsoleError = (error) => {
  if (error) {
    console.error(error);
  }

  return Promise.reject({});
};
