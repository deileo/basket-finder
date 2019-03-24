import {ACCEPT_PARTICIPANT, CANCEL_PARTICIPANT, FLASH_MESSAGE, GET_PARTICIPANTS_UNCONFIRMED} from "./types";
import {acceptParticipant, cancelParticipant, getUnconfirmedParticipants} from '../services/participantService';

export const getUnconfirmedParticipantsAction = (token) => {
  return function(dispatch) {
    return getUnconfirmedParticipants(token)
      .then(response => {
        return dispatch({ type: GET_PARTICIPANTS_UNCONFIRMED, payload: response.data });
      })
      .catch(error => {
        if (error) {
          console.error(error);
        }
        return Promise.reject({});
      })
  };
};

export const acceptParticipantAction = (participant, token) => {
  return function(dispatch) {
    return acceptParticipant(participant, token)
      .then(response => {
        dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Request accepted!', variant: 'success'}});

        return dispatch({ type: ACCEPT_PARTICIPANT, payload: response.data });
      })
      .catch(error => {
        if (error) {
          console.error(error);
        }
        return Promise.reject({});
      })
  };
};

export const cancelParticipantAction = (participant, token) => {
  return function(dispatch) {
    return cancelParticipant(participant, token)
      .then(response => {
        dispatch({type: FLASH_MESSAGE, payload: {isOpen: true, message: 'Request cancelled!', variant: 'success'}});

        return dispatch({ type: CANCEL_PARTICIPANT, payload: response.data });
      })
      .catch(error => {
        if (error) {
          console.error(error);
        }
        return Promise.reject({});
      })
  };
};