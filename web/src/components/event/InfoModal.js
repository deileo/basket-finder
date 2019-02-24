import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";

class InfoModal extends Component {
  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const {event} = this.props;

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
          <DialogContent>
              <Typography variant="h6"  style={{color: 'rgba(0, 0, 0, 0.54)'}}>
                Vardas: {event.creatorFirstName} {event.creatorLastName}
              </Typography>
              <Typography variant="h6"  style={{color: 'rgba(0, 0, 0, 0.54)'}}>
                El. pastas: {event.creatorEmail ? event.creatorEmail : '-'}
              </Typography>
              <Typography variant="h6" style={{color: 'rgba(0, 0, 0, 0.54)'}}>
                Tel. nr: {event.creatorPhoneNumber ? event.creatorPhoneNumber : '-'}
              </Typography>
            <DialogContentText style={{color: 'rgba(0, 0, 0, 0.54)'}}>
              {event.comment ? event.comment : ''}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default InfoModal;