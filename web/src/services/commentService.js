import axios from 'axios';
import {API_URL} from "../config";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function createCourtComment(commentData, court, type) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/comment/court/' + type + '/' + court.id + '/new';

  return axios.post(url, commentData, config);
}

export function getCourtComments(court, type) {
  let url = API_URL + '/comment/court/' + type + '/' + court.id + '/get';

  return axios.get(url, config);
}

export function createEventComment(commentData, event, type) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/comment/event/' + type + '/' + event.id + '/new';

  return axios.post(url, commentData, config);
}

export function getEventComments(event, type) {
  let url = API_URL + '/comment/event/' + type + '/' + event.id + '/get';

  return axios.get(url, config);
}

