import axios from "axios";
import {API_URL} from "../config";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function sendPermissionRequest(requestData, token) {
  config.headers['X-AUTH-TOKEN'] = token;

  let url = API_URL + '/permission/new';

  return axios.post(url, requestData, config);
}