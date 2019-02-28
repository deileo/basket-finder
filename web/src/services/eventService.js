import axios from "axios";
import {TYPE_COURT, TYPE_GYM_COURT} from "../actions/types";

const config = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  }
};

export function createEvent(eventData, type = TYPE_COURT, token = null) {
  if (type === TYPE_GYM_COURT) {
    config.headers['X-AUTH-TOKEN'] = token;
  }

  return axios.post(
    type === TYPE_COURT ? 'http://localhost:8000/api/events/new' : 'http://localhost:8000/api/events/gym/new',
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

export function getEvents(courtId) {
  return axios.get(
    courtId ? 'http://localhost:8000/api/events/court/' + courtId : 'http://localhost:8000/api/events/all',
    config
  );
}
