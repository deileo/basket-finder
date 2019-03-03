import axios from 'axios';
import {TYPE_COURT} from "../actions/types";
import {API_URL} from "../config";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function fetchCourts(type) {
  let url = type === TYPE_COURT ? API_URL + '/courts/all' : API_URL + '/gym-courts/all';

  return axios.get(url, config);
}

export function getCourt(type, courtId) {
  let url = type === TYPE_COURT ? API_URL + '/courts/' : API_URL + '/gym-courts/';

  return axios.get(url + courtId, config);
}
