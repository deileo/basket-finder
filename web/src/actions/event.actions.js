import {
  CREATE_EVENT,
  CREATE_EVENT_ERROR,
  GET_EVENTS,
  FLASH_MESSAGE,
  JOIN_EVENT,
  LOADING_EVENTS_STARTED,
  LOADING_EVENTS_ENDED,
  GET_USER_CREATED_EVENTS,
  GET_USER_JOINED_EVENTS,
  RESET_EVENT_CREATION,
  REMOVE_EVENT_ERRORS,
  CREATE_EVENT_MODAL_CLOSED, LEAVE_EVENT, DELETE_EVENT, EDIT_EVENT, ACCEPT_PARTICIPANT
} from './types';
import {
  createEvent,
  joinEvent,
  getEvents,
  leaveEvent,
  getUserCreatedEvents,
  getUserJoinedEvents,
  deleteEvent,
  editEvent, getAllEvents
} from '../services/eventService';

export const createEventAction = (createEventData, type) => {
  return function(dispatch) {
    return createEvent(createEventData, type)
      .then(response => {
        if (response.status === 201) {
          dispatch({type: CREATE_EVENT_MODAL_CLOSED, payload: {isOpen: false}});
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Rungtynės sėkmingai sukurtos!', variant: 'success'}});

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

export const editEventAction = (eventData, eventId, type) => {
  return function(dispatch) {
    return editEvent(eventData, eventId, type)
        .then(response => {
          if (response.status === 202) {
            dispatch({type: CREATE_EVENT_MODAL_CLOSED, payload: {isOpen: false}});
            dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Rungtynių informacija pakeista!', variant: 'success'}});

            return dispatch({type: EDIT_EVENT, payload: response.data});
          }

          return dispatch({ type: CREATE_EVENT_ERROR, payload: response.data });
        })
        .catch(error => {
          return showConsoleError(error);
        });
  };
};

export const joinEventAction = (eventId, type) => {
  return function(dispatch) {
    return joinEvent(eventId, type)
      .then(response => {
        if (response.status === 201) {
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Prisijungta į rungtynes!', variant: 'success'}});
          dispatch({type: ACCEPT_PARTICIPANT});

          return dispatch({type: JOIN_EVENT, payload: response.data});
        }
      })
      .catch(error => {
        return showConsoleError(error);
      })
  };
};

export const leaveEventAction = (eventId, type) => {
  return function(dispatch) {
    return leaveEvent(eventId, type)
      .then(response => {
        dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Nutrauktas dalyvavimas!', variant: 'success'}});

        return dispatch({type: LEAVE_EVENT, payload: response.data});
      })
      .catch(error => {
        return showConsoleError(error);
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

export const getAllEventsAction = () => {
  return function(dispatch) {
    dispatch({ type: LOADING_EVENTS_STARTED });

    return getAllEvents()
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

export const getUserCreatedEventsAction = () => {
  return function (dispatch) {
    return getUserCreatedEvents()
        .then(response => {
          return dispatch({ type: GET_USER_CREATED_EVENTS, payload: response.data });
        })
        .catch(error => {
          return showConsoleError(error);
        })
  }
};

export const getUserJoinedEventsAction = () => {
  return function (dispatch) {
    return getUserJoinedEvents()
        .then(response => {
          return dispatch({ type: GET_USER_JOINED_EVENTS, payload: response.data });
        })
        .catch(error => {
          return showConsoleError(error);
        })
  }
};

export const deleteEventAction = (event, type) => {
  return function(dispatch) {
    return deleteEvent(event, type)
      .then(response => {
        if (response.status === 200) {
          dispatch({type: DELETE_EVENT});
          dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Rungtynės pašalintos!', variant: 'success'}});
        }
      })
      .catch(error => {
        return showConsoleError(error);
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
