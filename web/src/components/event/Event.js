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
import {eventStyles, modalStyles} from "../styles";
import {getConfirmedParticipantsCount, getEventTime} from "../../services/eventService";
import {connect} from "react-redux";
import * as actions from './../../actions';
import Comments from "../comment/Comments";

class Event extends Component {

  state = {
    infoModalOpen: false,
    commentModalOpen: false,
  };

  handleOpenInfoModalClick = () => {
    this.setState({infoModalOpen: true});
  };

  handleCloseInfoModalClick = () => {
    this.setState({infoModalOpen: false});
  };

  handleCommentOpen = () => {
    this.setState({commentModalOpen: true});
  };

  handleCommentClose = () => {
    this.setState({commentModalOpen: false});
  };


  handleJoin = () => {
    const {event, type} = this.props;
    this.props.joinEventAction(event.id, type);
  };

  handleLeave = () => {
    const {event, type} = this.props;
    this.props.leaveEventAction(event.id, type);
  };

  renderEventJoinActions = (userReducer, event, type) => {
    if (!userReducer.isAuthenticated) {
      return null;
    }

    let joinedUserList = event.participants.filter(function (participant) {
      return type === TYPE_GYM_COURT ?
        participant.user && participant.user.id === userReducer.auth.id :
        participant.id === userReducer.auth.id;
    });


    if (joinedUserList.length > 0) {
      if (type === TYPE_GYM_COURT) {
        let confirmedUsers = joinedUserList.filter(function (participant) {
          return participant.isConfirmed === true;
        });

        if (confirmedUsers.length > 0) {
          return (
            <Button size="small" variant="contained" color="secondary" onClick={this.handleLeave}>
              Išeiti
            </Button>
          )
        } else {
          return (
            <Button size="small" variant="contained" color="inherit" disabled={true}>
              Prašymas išsiųstas
            </Button>
          )
        }
      }

      return (
        <Button size="small" variant="contained" color="secondary" onClick={this.handleLeave}>
          Išeiti
        </Button>
      )
    }

    return (
      <Button size="small" variant="contained" color="primary" onClick={this.handleJoin}>
        {this.props.type === TYPE_GYM_COURT ? 'Siųsti prašymą' : 'Prisijungti'}
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
            Žaidėjai: {type === TYPE_GYM_COURT ? getConfirmedParticipantsCount(event) : event.participants.length}/{event.neededPlayers}
          </Typography>
          {type === TYPE_GYM_COURT && event.price > 0 ?
            <Typography variant="body1" gutterBottom className={classes.eventContent}>
              Kaina: {event.price} €
            </Typography> : ''
          }
          {event.comment ?
            <Typography variant="body1" gutterBottom style={{color: 'rgba(0, 0, 0, 0.54)'}}>
              Aprašymas: {event.comment.substring(0, 100)}{event.comment.length > 100 ? '...' : ''}
            </Typography> : ''
          }
          <CardActions>
            {this.renderEventJoinActions(this.props.userReducer, event, type)}
            <Button size="small" variant="outlined" color="primary" onClick={this.handleOpenInfoModalClick}>
              Žaidėjai
            </Button>

            <Button size="small" variant="outlined" color="primary" onClick={() => this.handleCommentOpen()}>
              Komentarai {this.props.commentsCount > 0 ? ' (' + this.props.commentsCount + ')' : null}
            </Button>

            <Modal
              open={this.state.infoModalOpen}
              onClose={this.handleClose}
            >
              <div style={modalStyles} className={classes.paper}>
                <InfoModal
                  event={event}
                  onClose={this.handleCloseInfoModalClick}
                  open={this.state.infoModalOpen}
                  type={type}
                />
              </div>
            </Modal>

            <Modal
              open={this.state.commentModalOpen}
              onClose={this.handleCommentClose}
            >
              <div style={modalStyles} className={classes.paper}>
                <Comments event={event} type={type} handleClose={this.handleCommentClose}/>
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
