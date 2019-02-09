import {CREATE_EVENT, CREATE_EVENT_ERROR, FLASH_MESSAGE, JOIN_EVENT, MODAL_CLOSED} from './types';
import {createEvent, joinEvent} from '../services/eventService';

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
