import React, {Component} from 'react';
import EventLoader from "../EventLoader";
import Paper from '@material-ui/core/Paper';
import Event from "./Event";
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from "@material-ui/core";
import {eventListStyles} from "../styles";
import {connect} from "react-redux";
import * as actions from '../../actions';

class EventList extends Component {

  componentDidMount() {
    this.props.getEventsAction(this.props.courtsReducer.type);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let court = this.props.courtsReducer ? this.props.courtsReducer.court : null;
    let prevCreated = prevProps.eventReducer ? prevProps.eventReducer.created : null;
    let created = this.props.eventReducer ? this.props.eventReducer.created : null;

    if (court && !prevCreated && created) {
      this.props.fetchCourtById(this.props.courtsReducer.type, court.id);
      this.props.getEventsAction(this.props.courtsReducer.type, court.id);
      this.props.resetEventCreationAction();
    }
  }

  renderEvents = (events) => {
    return (
      <div>
        {events.map(event => {
          return (
            <Event
              key={event.id}
              event={event}
              type={this.props.courtsReducer.type}
            />
          )
        })}
      </div>
    )
  };

  renderCourtEvents = (court, classes) => {
    const events = this.props.eventReducer.events;
    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h5" component="h3">
            {court.address}
          </Typography>
          <Typography component="p">
            Kiekis: {events.length}
          </Typography>
          <Typography component="p">
            Rajonas: {court.location}
          </Typography>
        </Paper>
        {events.length ? this.renderEvents(events) :
          <Typography className={classes.textCenter} variant="h5" component="h2">Nera paskelbtu varzybu</Typography>
        }
      </div>
    )
  };

  renderAllEvents = (events, classes) => {
    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="h5" component="h3">
            Artimiausios varžybos
          </Typography>
          <Typography component="p">
            Kiekis: {events.length}
          </Typography>
        </Paper>
        {events.length ? this.renderEvents(events) :
          <Typography className={classes.textCenter} variant="h5" component="h2">Nera paskelbtu varzybu</Typography>
        }
      </div>
    )
  };

  render() {
    const {eventReducer, courtsReducer, loaderReducer, classes} = this.props;

    if (loaderReducer.isEventsLoading) {
      return (<div className={classes.root}><EventLoader/></div>)
    }

    if (!eventReducer || !courtsReducer) {
      return null
    }

    let court = courtsReducer ? courtsReducer.court : null;
    let events = eventReducer ? eventReducer.events : [];

    return (
      <div className={classes.root}>
        {court ? this.renderCourtEvents(court, classes) : this.renderAllEvents(events, classes)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
    courtsReducer: state.courtsReducer,
    loaderReducer: state.loaderReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventListStyles)(EventList));
