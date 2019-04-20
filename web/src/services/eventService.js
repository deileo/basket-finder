import axios from "axios";
import {TYPE_COURT, TYPE_GYM_COURT} from "../actions/types";
import {API_URL} from "../config";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};


export function createEvent(eventData, type = TYPE_COURT) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/events/' + type +'/new';

  return axios.post(url, eventData, config);
}

export function editEvent(eventData, eventId, type = TYPE_COURT) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/events/' + type + '/' + eventId + '/edit';

  return axios.post(url, eventData, config);
}

export function joinEvent(eventId, type) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  return axios.post(
    API_URL + '/events/' + type + '/' + eventId + '/join', {},
    config
  );
}

export function leaveEvent(eventId, type) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/events/' + type + '/' + eventId + '/leave';

  return axios.post(url, {}, config);
}

export function getEvents(type, courtId = null) {
  if (!type) {
    type = TYPE_COURT;
  }

  let url = courtId ?
    API_URL + '/events/' + type + '/' + courtId :
    API_URL + '/events/' + type + '/all';

  return axios.get(url, config);
}

export function getAllEvents() {
  return axios.get(API_URL + '/events/admin/all/events', config);
}

export function getUserCreatedEvents() {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/events/user';

  return axios.get(url, config);
}

export function getUserJoinedEvents() {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/events/user/joined/events';

  return axios.get(url, config);
}

export function deleteEvent(eventId, type) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/events/' + type + '/' + eventId + '/delete';

  return axios.post(url, {}, config);
}

export const getEventTime = (event, type) => {
  let eventTime = event.date + ' ' + event.startTime;

  if (type === TYPE_GYM_COURT && event.endTime) {
    eventTime += ' - ' + event.endTime;
  }

  return eventTime;
};

export const getConfirmedParticipantsCount = (event) => {
  let confirmedParticipants = event.participants.filter(function(participant) {
    return participant.isConfirmed === true;
  });

  return confirmedParticipants.length;
};

export const isArrayNotEmpty = (collection) => {
  return collection && collection.length > 0;
};
