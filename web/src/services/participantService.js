import axios from "axios";
import {API_URL} from "../config";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function getUnconfirmedParticipants(token) {
  config.headers['X-AUTH-TOKEN'] = token;

  let url = API_URL + '/participants/unconfirmed';

  return axios.get(url, config);
}

export function getEventParticipants(event, type) {
  let url = API_URL + '/participants/event/' + type + '/' + event.id;

  return axios.get(url, config);
}

export function acceptParticipant(participant, token) {
  config.headers['X-AUTH-TOKEN'] = token;

  let url = API_URL + '/participants/accept/' + participant.id;

  return axios.post(url, {}, config);
}

export function cancelParticipant(participant, token) {
  config.headers['X-AUTH-TOKEN'] = token;

  let url = API_URL + '/participants/cancel/' + participant.id;

  return axios.post(url, {}, config);
}
