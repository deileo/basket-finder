import axios from 'axios';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export function fetchCourts() {
  return axios.get(
    'http://localhost:8000/api/courts/all',
    config
  );
}

export function createEvent(eventData) {
  return axios.post(
    'https://shrouded-inlet-61901.herokuapp.com/events',
    eventData,
    config
  );
}

export function joinEvent(joinData) {
  console.log(joinData);
  return axios.post(
    'https://shrouded-inlet-61901.herokuapp.com/events/' + joinData.eventId + '/participate/' + joinData.userId,
    config
  );
}