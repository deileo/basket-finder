import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import {TYPE_COURT} from "../../actions/types";

class InfoModal extends Component {
  handleClose = () => {
    this.props.onClose();
  };

  renderEventInfo = (event) => {
    return (
      <DialogContent>
        <Typography variant="h6"  style={{color: 'rgba(0, 0, 0, 0.54)'}}>
          Vardas: {event.creatorFirstName} {event.creatorLastName}
        </Typography>
        <Typography variant="h6"  style={{color: 'rgba(0, 0, 0, 0.54)'}}>
          El. pastas: {event.creatorEmail ? event.creatorEmail : '-'}
        </Typography>
        <DialogContentText style={{color: 'rgba(0, 0, 0, 0.54)'}}>
          {event.comment ? event.comment : ''}
        </DialogContentText>
      </DialogContent>
    )
  };

  renderGymEventInfo = (event) => {
    let createdBy = event.createdBy;

    return (
      <DialogContent>
        <Typography variant="h6"  style={{color: 'rgba(0, 0, 0, 0.54)'}}>
          Vardas: {createdBy.firstName} {createdBy.lastName}
        </Typography>
        <Typography variant="h6"  style={{color: 'rgba(0, 0, 0, 0.54)'}}>
          El. pastas: {createdBy.email}
        </Typography>
        <DialogContentText style={{color: 'rgba(0, 0, 0, 0.54)'}}>
          {event.comment ? event.comment : ''}
        </DialogContentText>
      </DialogContent>
    )
  };

  render() {
    const {type, event} = this.props;

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
          <DialogTitle id="alert-dialog-title">
            Kontaktine informacija
            <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <hr/>
          </DialogTitle>
          {type === TYPE_COURT ? this.renderEventInfo(event) : this.renderGymEventInfo(event)}
        </Dialog>
      </div>
    );
  }
}

export default InfoModal;
