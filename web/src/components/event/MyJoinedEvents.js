import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {eventStyles} from '../styles';
import {connect} from 'react-redux';
import * as actions from './../../actions';
import Typography from "@material-ui/core/es/Typography/Typography";
import {getConfirmedParticipantsCount, getEventTime, isArrayNotEmpty} from "../../services/eventService";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import LeaveIcon from '@material-ui/icons/RemoveCircle';
import {TYPE_COURT, TYPE_GYM_COURT} from "../../actions/types";
import EventLoader from "../EventLoader";
import icon  from "../../event-icon.png";

class MyJoinedEvents extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.eventReducer.reload && !prevProps.eventReducer.reload) {
      this.props.getUserJoinedEventsAction();
    }
  }

  handleLeave = (event) => {
    this.props.leaveEventAction(event.id, event.court ? TYPE_COURT : TYPE_GYM_COURT);
    this.props.getUserJoinedEventsAction();
  };

  getEventListItemInfo = (event) => {
    let info = 'Žaidėjai: ' + (event.court ? event.participants.length : getConfirmedParticipantsCount(event)) + "/" + event.neededPlayers;
    if (event.price) {
      info += ' Kaina: ' + event.price + '€';
    }

    return info;
  };

  render() {
    const {classes, eventReducer, loaderReducer} = this.props;

    if (loaderReducer.isEventsLoading) {
      return (
        <div>
          <List className={classes.root} style={{height: '30vh'}}>
            <EventLoader/>
          </List>
        </div>
      )
    }

    return (
      <List className={classes.root} style={{height: '30vh', overflowY: 'scroll'}}>
        {isArrayNotEmpty(eventReducer.userJoinedEvents) ? eventReducer.userJoinedEvents.map(event => {
          return (
            <ListItem alignItems="flex-start" key={event.id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={icon}/>
              </ListItemAvatar>
              <div>
                <ListItemText
                  style={{padding: 0}}
                  primary={event.name}
                  secondary={(event.court ? event.court.address : event.gymCourt.address) + ' (' + getEventTime(event) + ')'}
                />
                <ListItemText
                  style={{padding: 0}}
                  secondary={this.getEventListItemInfo(event)}
                />
              </div>
              <ListItemSecondaryAction>
                <IconButton aria-label="Edit" color={"secondary"} onClick={() => this.handleLeave(event)}>
                  <LeaveIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        }) : <Typography className={classes.textCenter} variant="h5">Nėra Dalyvavimų</Typography>}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
    userReducer: state.userReducer,
    loaderReducer: state.loaderReducer
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(MyJoinedEvents));
