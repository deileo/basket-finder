import axios from 'axios';
import {TYPE_COURT} from "../actions/types";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function fetchCourts(type) {
  let url = type === TYPE_COURT ? 'http://localhost:8000/api/courts/all' : 'http://localhost:8000/api/gym-courts/all';

  return axios.get(url, config);
}

export function getCourt(type, courtId) {
  let url = type === TYPE_COURT ? 'http://localhost:8000/api/courts/' : 'http://localhost:8000/api/gym-courts/';

  return axios.get(url + courtId, config);
}
