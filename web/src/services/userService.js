import axios from "axios";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function checkUser(userToken) {
  return axios.post('http://localhost:8000/api/connect/google/check',
    userToken,
    config
  );
}