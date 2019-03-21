import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {eventStyles} from '../styles';
import {connect} from 'react-redux';
import * as actions from './../../actions';
import Typography from "@material-ui/core/es/Typography/Typography";
import {getEventTime, isArrayNotEmpty} from "../../services/eventService";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import LeaveIcon from '@material-ui/icons/RemoveCircle';
import {TYPE_COURT, TYPE_GYM_COURT} from "../../actions/types";

class MyJoinedEvents extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {userReducer, eventReducer} = this.props;

    if (eventReducer.reload && !prevProps.eventReducer.reload) {
      this.props.getUserJoinedEventsAction(userReducer.auth.googleAccessToken);
    }
  }

  handleLeave = (event) => {
    const {userReducer} = this.props;

    this.props.leaveEventAction(userReducer.auth.googleAccessToken, event.id, event.court ? TYPE_COURT : TYPE_GYM_COURT);
    this.props.getUserJoinedEventsAction(userReducer.auth.googleAccessToken);
  };

  getEventListItemInfo = (event) => {
    let info = 'Zaidejai: ' + event.participants.length + "/" + event.neededPlayers;
    if (event.price) {
      info += ' Kaina: ' + event.price + '€';
    }

    return info;
  };

  render() {
    const {classes, eventReducer} = this.props;

    return (
      <List className={classes.root}>
        {isArrayNotEmpty(eventReducer.userJoinedEvents) ? eventReducer.userJoinedEvents.map(event => {
          return (
            <ListItem alignItems="flex-start" key={event.id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
              </ListItemAvatar>
              <div>
                <ListItemText
                  style={{padding: 0}}
                  primary={event.name}
                  secondary={event.court ? event.court.address : event.gymCourt.address + ' (' + getEventTime(event) + ')'}
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
        }) : <Typography className={classes.textCenter} variant="h5">Nera Dalyvavimu</Typography>}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(MyJoinedEvents));
