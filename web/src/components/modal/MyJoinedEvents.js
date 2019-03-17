import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import {eventStyles} from '../styles';
import {connect} from 'react-redux';
import * as actions from './../../actions';
import MyJoinedEvent from './../event/MyJoinedEvent'
import Typography from "@material-ui/core/es/Typography/Typography";

class MyJoinedEvents extends Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.open && this.props.open) {
      this.props.getUserJoinedEventsAction(this.props.user.googleAccessToken)
    }
  }

  handleClose = () => {
    this.props.toggleMyJoinedEventModalAction(false);
  };

  renderEvents = (events) => {
    return events.map(event => {
      return (
        <MyJoinedEvent
          key={event.id}
          event={event}
          type={this.props.type}
        />
      )
    });
  };

  render() {
    const {eventReducer} = this.props;

    if (!eventReducer || !eventReducer.userJoinedEvents) {
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
            Mano dalyvavimai
            <IconButton aria-label="Close" style={{position: 'absolute', top: '1rem', right: '15px'}}
                        onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <hr/>
          </DialogTitle>
          <DialogContent>
            {eventReducer.userJoinedEvents.length > 0 ?
              this.renderEvents(eventReducer.userJoinedEvents) :
              <Typography variant="h5" component="h4">
                Nera dalyvavimu
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

export default connect(mapStateToProps, actions)(withStyles(eventStyles)(MyJoinedEvents));
