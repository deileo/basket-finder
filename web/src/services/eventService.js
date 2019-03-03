import axios from "axios";
import {TYPE_COURT, TYPE_GYM_COURT} from "../actions/types";
import {API_URL} from "../config";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function createEvent(eventData, type = TYPE_COURT, token = null) {
  if (type === TYPE_GYM_COURT) {
    config.headers['X-AUTH-TOKEN'] = token;
  }

  let url = type === TYPE_COURT ?
    API_URL + '/events/new' :
    API_URL + '/events/gym/new';

    return axios.post(url, eventData, config);
}

export function joinEvent(joinData) {
  return axios.post(
    'https://shrouded-inlet-61901.herokuapp.com/events/' + joinData.eventId + '/participate/' + joinData.userId,
    config
  );
}

export function getEvents(type, courtId = null) {
  let gymType = type === TYPE_GYM_COURT ? 'gym/' : '';
  let url = courtId ?
    API_URL + '/events/' + gymType + 'court/' + courtId :
    API_URL + '/events/' + gymType + 'all';

  return axios.get(url, config);
}
