import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import {connect} from "react-redux";
import * as actions from "../../actions";
import {withStyles} from "@material-ui/core";
import {eventStyles} from "../styles";
import {isArrayNotEmpty} from "../../services/eventService";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

class InfoModal extends Component {
  handleClose = () => {
    this.props.onClose();
  };

  componentDidMount() {
    const {event, type} = this.props;
    this.props.getEventParticipantsAction(event, type);
  }

  componentWillUnmount() {
    this.props.resetEventParticipantsAction();
  }

  render() {
    const {classes, participantReducer, event} = this.props;

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          maxWidth={'sm'}
          fullWidth={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{paddingBottom: 0}}>Organizatorius</DialogTitle>
          <DialogContent style={{paddingBottom: 0}}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={event.createdBy.googleImage}/>
              </ListItemAvatar>
              <ListItemText
                primary={event.createdBy.firstName + ' ' + event.createdBy.lastName}
                secondary={'El. paštas: ' + event.createdBy.email}
              />
            </ListItem>
          </DialogContent>
          <hr/>
          <DialogTitle id="alert-dialog-title" style={{paddingBottom: 0}}>
            Prisijungę žaidėjai
            <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <hr/>
          </DialogTitle>
          <DialogContent>
            <List className={classes.root}>
              {isArrayNotEmpty(participantReducer.eventParticipants) ? participantReducer.eventParticipants.map(participant => {
                return (
                  <ListItem alignItems="flex-start" key={participant.id}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={participant.googleImage}/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={participant.firstName + ' ' + participant.lastName}
                      secondary={'El. paštas: ' + participant.email}
                    />
                  </ListItem>
                )
              }) : <Typography className={classes.textCenter} variant="h5">Nėra Prisijungusių žaidėjų</Typography>}
            </List>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    participantReducer: state.participantReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(InfoModal));
