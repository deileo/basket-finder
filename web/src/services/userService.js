import axios from "axios";
import {API_URL} from "../config";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function checkUser(userToken) {
  return axios.post(API_URL + '/connect/google/check',
    userToken,
    config
  );
}

export function getAllUsers() {
  return axios.get(API_URL + '/user/all',
    config
  );
}

export function disableUser(user) {
  return axios.get(API_URL + '/user/' + user.id + '/disable',
    config
  );
}

export function enableUser(user) {
  return axios.get(API_URL + '/user/' + user.id + '/enable',
    config
  );
}