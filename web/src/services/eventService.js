import axios from "axios";
import {TYPE_COURT, TYPE_GYM_COURT} from "../actions/types";
import {API_URL} from "../config";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

const getGymTypeUrlPart = (type) => {
  return type === TYPE_GYM_COURT ? 'gym/' : '';
};

export function createEvent(eventData, type = TYPE_COURT, token) {
  config.headers['X-AUTH-TOKEN'] = token;

  let url = type === TYPE_COURT ?
    API_URL + '/events/new' :
    API_URL + '/events/gym/new';

  return axios.post(url, eventData, config);
}

export function joinEvent(token, eventId, type) {
  config.headers['X-AUTH-TOKEN'] = token;

  return axios.post(
    API_URL + '/events/' + getGymTypeUrlPart(type) + eventId + '/join', {},
    config
  );
}

export function leaveEvent(token, eventId, type) {
  config.headers['X-AUTH-TOKEN'] = token;

  return axios.post(
    API_URL + '/events/' + getGymTypeUrlPart(type) + eventId + '/leave', {},
    config
  );
}

export function getEvents(type, courtId = null) {
  let url = courtId ?
    API_URL + '/events/' + getGymTypeUrlPart(type) + 'court/' + courtId :
    API_URL + '/events/' + getGymTypeUrlPart(type) + 'all';

  return axios.get(url, config);
}

export function getUserCreatedEvents(token) {
  config.headers['X-AUTH-TOKEN'] = token;

  let url = API_URL + '/events/user';

  return axios.get(url, config);
}

export function getUserJoinedEvents(token) {
  config.headers['X-AUTH-TOKEN'] = token;

  let url = API_URL + '/events/user/joined';

  return axios.get(url, config);
}
