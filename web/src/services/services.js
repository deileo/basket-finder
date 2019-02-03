import axios from 'axios';

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function fetchCourts() {
  return axios.get(
    'http://localhost:8000/php/courts/all',
    config
  );
}

export function createEvent(eventData) {
  return axios.post(
    'http://localhost:8000/php/events/new',
    eventData,
    config
  );
}

export function joinEvent(joinData) {
  return axios.post(
    'https://shrouded-inlet-61901.herokuapp.com/events/' + joinData.eventId + '/participate/' + joinData.userId,
    config
  );
}