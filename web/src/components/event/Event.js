import React, {Component} from "react";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import {withStyles} from '@material-ui/core/styles';
import InfoModal from "./InfoModal";
import Modal from "@material-ui/core/Modal/Modal";
import {TYPE_GYM_COURT} from "../../actions/types";
import {eventStyles} from "../styles";
import {getEventTime} from "../../services/eventService";
import {connect} from "react-redux";
import * as actions from './../../actions';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

class Event extends Component {

  state = {
    infoModalOpen: false,
  };

  handleOpenInfoModalClick = () => {
    this.setState({infoModalOpen: true});
  };

  handleCloseInfoModalClick = () => {
    this.setState({infoModalOpen: false});
  };

  handleJoin = () => {
    const {userReducer, event, type} = this.props;
    this.props.joinEventAction(userReducer.auth.googleAccessToken, event.id, type);
  };

  handleLeave = () => {
    const {userReducer, event, type} = this.props;
    this.props.leaveEventAction(userReducer.auth.googleAccessToken, event.id, type);
  };

  renderEventJoinActions = (userReducer, event) => {
    if (!userReducer.isAuthenticated) {
      return null;
    }

    let isUserJoined = event.participants.map(function (participant) {
      return participant.id === userReducer.auth.id;
    });

    if (isUserJoined.length > 0) {
      return (
        <Button size="small" variant="contained" color="secondary" onClick={this.handleLeave}>
          Išeiti
        </Button>
      )
    }

    return (
      <Button size="small" variant="contained" color="primary" onClick={this.handleJoin}>
        Prisijungti
      </Button>
    );
  };

  render() {
    const {type, event, classes} = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5">
            {event.name}
          </Typography>
          <hr/>
          <Typography variant="body1" gutterBottom className={classes.eventContent}>
            Laikas: {getEventTime(event, type)}
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.eventContent}>
            Adresas: {event.court ? event.court.address : event.gymCourt.address}
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.eventContent}>
            Zaidejai: {event.participants.length}/{event.neededPlayers}
          </Typography>
          {type === TYPE_GYM_COURT && event.price > 0 ?
            <Typography variant="body1" gutterBottom className={classes.eventContent}>
              Kaina: {event.price} €
            </Typography> : ''
          }
          {event.comment ?
            <Typography variant="body1" gutterBottom style={{color: 'rgba(0, 0, 0, 0.54)'}}>
              Aprasymas: {event.comment.substring(0, 100)}{event.comment.length > 100 ? '...' : ''}
            </Typography> : ''
          }
          <CardActions>
            {this.renderEventJoinActions(this.props.userReducer, event)}
            <Button size="small" variant="outlined" color="primary" onClick={this.handleOpenInfoModalClick}>
              Informacija
            </Button>

            <Modal
              open={this.state.infoModalOpen}
              onClose={this.handleClose}
            >
              <div style={getModalStyle()} className={classes.paper}>
                <InfoModal
                  event={event}
                  onClose={this.handleCloseInfoModalClick}
                  open={this.state.infoModalOpen}
                  type={type}
                />
              </div>
            </Modal>
          </CardActions>
        </CardContent>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(Event));
