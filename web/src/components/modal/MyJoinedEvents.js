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
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import Tab from "@material-ui/core/es/Tab/Tab";
import {TYPE_COURT, TYPE_GYM_COURT} from "../../actions/types";

class MyJoinedEvents extends Component {
  state = {
    value: 0,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {eventReducer} = this.props;

    if ((!prevProps.open && this.props.open) || eventReducer.reload) {
      this.props.getUserJoinedEventsAction(this.props.user.googleAccessToken)
    }
  }

  handleClose = () => {
    this.props.toggleMyJoinedEventModalAction(false);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  renderEvents = (events) => {
    if (events.length === 0) {
      return (
        <Typography variant="h5" component="h2">
          Nera dalyvavimu
        </Typography>
      )
    }

    return events.map(event => {
      return (
        <MyJoinedEvent
          key={event.id}
          event={event}
          type={this.state.value === 1 ? TYPE_GYM_COURT : TYPE_COURT}
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
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Lauko" />
                <Tab label="Vidaus" />
              </Tabs>
            </AppBar>
            {this.state.value === 0 && <div>{this.renderEvents(eventReducer.userJoinedEvents.court)}</div>}
            {this.state.value === 1 && <div>{this.renderEvents(eventReducer.userJoinedEvents.gymCourt)}</div>}
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
