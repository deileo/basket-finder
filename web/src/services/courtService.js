import axios from 'axios';

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function fetchCourts() {
  return axios.get(
    'http://localhost:8000/api/courts/all',
    config
  );
}

export function getCourt(courtId) {
  return axios.get(
    'http://localhost:8000/api/courts/' + courtId,
    config
  );
}