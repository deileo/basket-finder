import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {eventStyles} from '../styles';
import {connect} from 'react-redux';
import * as actions from './../../actions';
import Typography from "@material-ui/core/es/Typography/Typography";
import {isArrayNotEmpty} from "../../services/eventService";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import LeaveIcon from '@material-ui/icons/RemoveCircle';
import CheckIcon from '@material-ui/icons/Check';
import EventLoader from "../EventLoader";

class MyParticipantRequests extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {userReducer, eventReducer, participantReducer} = this.props;

    if ((eventReducer.reload && !prevProps.eventReducer.reload) ||
        (participantReducer.reload && !prevProps.participantReducer.reload)
    ) {
      this.setState({
        open: false,
        activeEvent: null,
      });

      this.props.getUnconfirmedParticipantsAction(userReducer.auth.googleAccessToken);
    }
  }

  handleConfirm = (participant) => {
    const {googleAccessToken} = this.props.userReducer.auth;

    this.props.acceptParticipantAction(participant, googleAccessToken);
    this.props.getUnconfirmedParticipantsAction(googleAccessToken);
  };

  handleCancel = (participant) => {
    const {googleAccessToken} = this.props.userReducer.auth;

    this.props.cancelParticipantAction(participant, googleAccessToken);
    this.props.getUnconfirmedParticipantsAction(googleAccessToken);
  };

  render() {
    const {classes, participantReducer, loaderReducer} = this.props;

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
      <List className={classes.root} style={{height: '30vh'}}>
        {isArrayNotEmpty(participantReducer.unconfirmedParticipants) ? participantReducer.unconfirmedParticipants.map(participant => {
          let user = participant.user;
          let event = participant.event;
          return (
            <ListItem alignItems="flex-start" key={participant.id}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={user.googleImage}/>
              </ListItemAvatar>
              <div style={{marginLeft: 10}}>
                <ListItemText
                  style={{padding: 0}}
                  primary={'Prasymas prisijungti i ' + event.name}
                  secondary={'Vardas: ' + user.firstName + ' ' + user.lastName}
                />
                <ListItemText
                  style={{padding: 0}}
                  secondary={'El. pastas: ' + user.email}
                />
              </div>
              <ListItemSecondaryAction>
                <IconButton aria-label="Edit" color={"primary"} onClick={() => this.handleConfirm(participant)}>
                  <CheckIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                </IconButton>
                <IconButton aria-label="Delete" color={"secondary"} onClick={() => this.handleCancel(participant)}>
                  <LeaveIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        }) : <Typography className={classes.textCenter} variant="h5">Nera Prasymu</Typography>}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    loaderReducer: state.loaderReducer,
    participantReducer: state.participantReducer,
    eventReducer: state.eventReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(MyParticipantRequests));
