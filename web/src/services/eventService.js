import axios from "axios";
import {TYPE_COURT, TYPE_GYM_COURT} from "../actions/types";
import {API_URL} from "../config";
import * as moment from "moment";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};


export function createEvent(eventData, type = TYPE_COURT, token) {
  config.headers['X-AUTH-TOKEN'] = token;

  let url = API_URL + '/events/' + type +'/new';

  return axios.post(url, eventData, config);
}

export function joinEvent(token, eventId, type) {
  config.headers['X-AUTH-TOKEN'] = token;

  return axios.post(
    API_URL + '/events/' + type + '/' + eventId + '/join', {},
    config
  );
}

export function leaveEvent(token, eventId, type) {
  config.headers['X-AUTH-TOKEN'] = token;

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

export function getUserCreatedEvents(token) {
  config.headers['X-AUTH-TOKEN'] = token;

  let url = API_URL + '/events/user';

  return axios.get(url, config);
}

export function getUserJoinedEvents(token) {
  config.headers['X-AUTH-TOKEN'] = token;

  let url = API_URL + '/events/user/joined/events';

  return axios.get(url, config);
}

export function getEventTime(event, type) {
  let startTime = moment.unix(event.startTime.timestamp);
  let eventTime = moment.unix(event.date.timestamp).format('YYYY-MM-DD') + ' ' + startTime.format('H:mm');

  if (type === TYPE_GYM_COURT && event.endTime) {
    eventTime += ' - ' + moment.unix(event.endTime.timestamp).format('H:mm');
  }

  return eventTime;
}