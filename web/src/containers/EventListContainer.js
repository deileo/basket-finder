import { connect } from 'react-redux';
import * as actions from '../actions';
import EventList from "../components/event/EventList";

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
    courtsReducer: state.courtsReducer,
    loaderReducer: state.loaderReducer
  };
};

const EventListContainer = connect(mapStateToProps, actions)(EventList);

export default EventListContainer;
