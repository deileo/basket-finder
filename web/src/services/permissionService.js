import axios from "axios";
import {API_URL} from "../config";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function sendPermissionRequest(requestData) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');
  config.headers['Content-Type'] = 'multipart/form-data';

  const formData = new FormData();
  formData.append('file', requestData.file);
  formData.append('message', requestData.message);
  formData.append('gymCourt', requestData.gymCourt);

  let url = API_URL + '/permission/new';

  return axios.post(url, formData, config);
}

export function sendPermissionRequestApproval(permissionId, approveData) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/permission/approve/' + permissionId;

  return axios.post(url, approveData, config);
}

export function deletePermission(permissionId) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/permission/delete/' + permissionId;

  return axios.post(url, {}, config);
}

export function getGymCourtPermission(gymCourtId) {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/permission/gym-court/' + gymCourtId;

  return axios.post(url, {}, config);
}

export function getPermissions() {
  config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');

  let url = API_URL + '/permission/all';

  return axios.post(url, {}, config);
}
