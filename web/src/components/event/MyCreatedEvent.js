import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {eventStyles} from '../styles';
import {getEventTime} from '../../services/eventService';
import {connect} from 'react-redux';
import * as actions from './../../actions';
import {TYPE_COURT} from "../../actions/types";
import CreateEventForm from "../form/CreateEventForm";
import Modal from "@material-ui/core/Modal";
import CreateGymEventForm from "../form/CreateGymEventForm";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class MyCreatedEvent extends Component {

  handleDelete = () => {
    const {userReducer, event, type} = this.props;

    this.props.deleteEventAction(event.id, type, userReducer.auth.googleAccessToken);
    this.props.getUserCreatedEventsAction(userReducer.auth.googleAccessToken);
  };

  handleClose = () => {
    this.props.closeCreateEventModalAction();
    this.props.removeEventErrorsAction();
  };

  handleOpen = () => {
    this.props.openCreateEventModalAction();
  };

  render () {
    const {modalReducer, event, type, classes} = this.props;

    return (
      <Card className={classes.card} key={event.id}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5">
            {event.name}
          </Typography>
          <hr/>
          <Typography variant="h6" gutterBottom className={classes.eventContent}>
            Laikas: {getEventTime(event, type)}
          </Typography>
          <Typography variant="h6" gutterBottom className={classes.eventContent}>
            Adresas: {event.court ? event.court.address : event.gymCourt.address}
          </Typography>
          <Typography variant="h6" gutterBottom className={classes.eventContent}>
            Zaidejai: {event.participants.length}/{event.neededPlayers}
          </Typography>
          {event.price && event.price > 0 ?
            <Typography variant="h6" gutterBottom className={classes.eventContent}>
              Kaina: {event.price} €
            </Typography> : ''
          }
          {event.comment ?
            <Typography variant="body1" gutterBottom style={{color: 'rgba(0, 0, 0, 0.54)'}}>
              Aprasymas: {event.comment.substring(0, 100)}{event.comment.length > 100 ? '...' : ''}
            </Typography> : ''
          }
          <CardActions>
            <Button size="small" variant="contained" color="primary" onClick={this.handleOpen}>
              Redaguoti
            </Button>
            <Button size="small" variant="contained" color="secondary" onClick={this.handleDelete}>
              Ištrinti
            </Button>
          </CardActions>
        </CardContent>
        <Modal
            open={modalReducer.isCreateEventOpen}
            onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {type === TYPE_COURT ?
                <CreateEventForm court={event.court} event={event} handleClose={this.handleClose}/> :
                <CreateGymEventForm court={event.court} event={event} handleClose={this.handleClose}/>
            }
          </div>
        </Modal>
      </Card>

    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    modalReducer: state.modalReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(MyCreatedEvent));
