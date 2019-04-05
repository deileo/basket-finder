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
  let url = type === TYPE_COURT ? API_URL + '/courts/court/all' : API_URL + '/courts/gym-court/all';

  return axios.get(url, config);
}

export function getCourt(type, courtId) {
  let url = type === TYPE_COURT ? API_URL + '/courts/court/' : API_URL + '/courts/gym-court/';

  return axios.get(url + courtId, config);
}

export function getAllAdminCourts()
{
  return axios.get(API_URL + '/courts/all/court/admin', config);
}

export function getAllAdminGymCourts()
{
  return axios.get(API_URL + '/courts/all/gym-court/admin', config);
}
