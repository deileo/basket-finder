import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {eventStyles, modalStyles} from '../styles';
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {TYPE_COURT, TYPE_GYM_COURT} from "../../actions/types";
import Modal from "@material-ui/core/Modal";
import CreateEventForm from "../form/CreateEventForm";
import CreateGymEventForm from "../form/CreateGymEventForm";
import EventLoader from "../EventLoader";
import icon  from "../../event-icon.png";

class MyCreatedEvents extends Component {

  state = {
    activeEvent: null,
    open: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {eventReducer} = this.props;

    if (eventReducer.reload && !prevProps.eventReducer.reload) {
      this.setState({
        open: false,
        activeEvent: null,
      });

      this.props.getUserCreatedEventsAction();
    }
  }

  handleDelete = (event) => {
    this.props.deleteEventAction(event.id, event.court ? TYPE_COURT : TYPE_GYM_COURT);
    this.props.getUserCreatedEventsAction();
  };

  handleClose = () => {
    this.setState({
      activeEvent: null,
      open: false,
    });

    this.props.removeEventErrorsAction();
  };

  handleOpen = (event) => {
    this.setState({
      activeEvent: event,
      open: true
    });
  };

  getEventListItemInfo = (event) => {
    let info = 'Žaidėjai: ' + (event.court ? event.participants.length : getConfirmedParticipantsCount(event)) + "/" + event.neededPlayers;
    if (event.price) {
      info += ' Kaina: ' + event.price + '€';
    }

    return info;
  };

  renderEventForm = (activeEvent) => {
    if (activeEvent) {
      if (activeEvent.court) {
        return <CreateEventForm
          court={activeEvent.court}
          event={activeEvent}
          handleClose={this.handleClose}
        />
      }

      return <CreateGymEventForm
        court={activeEvent.gymCourt}
        event={activeEvent}
        handleClose={this.handleClose}
      />
    }
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
      <div>
      <List className={classes.root} style={{height: '30vh', overflowY: 'scroll'}}>
        {isArrayNotEmpty(eventReducer.userCreatedEvents) ? eventReducer.userCreatedEvents.map(event => {
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
                <IconButton aria-label="Edit" color={"primary"} onClick={() => this.handleOpen(event)}>
                  <EditIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                </IconButton>
                <IconButton aria-label="Delete" color={"secondary"} onClick={() => this.handleDelete(event)}>
                  <DeleteIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                </IconButton>
              </ListItemSecondaryAction>

            </ListItem>
          )
        }) : <Typography className={classes.textCenter} variant="h5">Nėra sukurtų varžybų</Typography>}
      </List>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={modalStyles} className={classes.paper}>
            {this.renderEventForm(this.state.activeEvent)}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
    userReducer: state.userReducer,
    loaderReducer: state.loaderReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(MyCreatedEvents));
