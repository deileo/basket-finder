import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import {eventStyles} from '../styles';
import { connect } from 'react-redux';
import * as actions from './../../actions';
import MyCreatedEvent from "./../event/MyCreatedEvent";
import Typography from "@material-ui/core/es/Typography/Typography";

class MyCreatedEvents extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.open && this.props.open) {
      this.props.getUserCreatedEventsAction(this.props.user.googleAccessToken)
    }
  }

  handleClose = () => {
    this.props.toggleMyEventModalAction(false);
  };

  renderEvents = (events) => {
    return events.map(event => {
      return (
        <MyCreatedEvent
          key={event.id}
          event={event}
          type={this.props.type}
        />
      )
    });
  };

  render() {
    const {eventReducer} = this.props;

    if (!eventReducer || !eventReducer.userCreatedEvents) {
      return null;
    }

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
            Mano sukūrtos varžybos
            <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}}
                        onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <hr/>
          </DialogTitle>
          <DialogContent>
            {eventReducer.userCreatedEvents.length > 0 ?
              this.renderEvents(eventReducer.userCreatedEvents) :
              <Typography variant="h5" component="h4">
                Nera sukurtu varzybu
              </Typography>
            }
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(MyCreatedEvents));
