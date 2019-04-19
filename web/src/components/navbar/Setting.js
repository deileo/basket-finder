import React, {Component} from 'react';
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import {withStyles} from "@material-ui/core";
import {connect} from 'react-redux';
import * as actions from './../../actions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import MyCreatedEvents from "../event/MyCreatedEvents";
import MyJoinedEvents from "../event/MyJoinedEvents";
import MyParticipantRequests from "../participant/MyParticipantRequests";
import Badge from "@material-ui/core/es/Badge/Badge";

class Setting extends Component {
  state = {
    open: false,
    value: 0,
    anchorEl: null,
  };

  componentDidMount() {
    this.props.getUserCreatedEventsAction();
    this.props.getUserJoinedEventsAction();
    this.props.getUnconfirmedParticipantsAction();
  }

  updateUserEvents() {
    if (this.state.value === 0) {
      this.props.getUnconfirmedParticipantsAction();
    }

    if (this.state.value === 1) {
      this.props.getUserJoinedEventsAction();
    }

    if (this.state.value === 2) {
      this.props.getUserCreatedEventsAction();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.open && this.state.open) {
      this.updateUserEvents();
    }

    if (prevState.value !== this.state.value) {
      this.updateUserEvents();
    }

    if (!prevProps.participantReducer.reload && this.props.participantReducer.reload) {
      this.props.getUnconfirmedParticipantsAction();
    }
  }

  toggleTab = (event) => {
    let isOpen = this.state.open;
    this.setState({open: !isOpen});
    this.setState({anchorEl: event.currentTarget});
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  render() {
    const {classes, participantReducer} = this.props;

    return (
      <div>
        <IconButton className={classes.menuButton} color="inherit" onClick={this.toggleTab}>
          <Badge badgeContent={participantReducer.unconfirmedParticipants.length} color="error">
            <AccountCircleIcon />
          </Badge>
        </IconButton>
        <Popper open={this.state.open} anchorEl={this.state.anchorEl} transition disablePortal>
          {({TransitionProps}) => (
            <Grow {...TransitionProps} id="setting-list-grow" style={{transformOrigin: 'center top'}}>
              <Paper>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Prašymai"/>
                  <Tab label="Dalyvavimai"/>
                  <Tab label="Sukurtos varžybos"/>
                </Tabs>
                {this.state.value === 0 && <MyParticipantRequests />}
                {this.state.value === 1 && <MyJoinedEvents />}
                {this.state.value === 2 && <MyCreatedEvents />}
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
    modalReducer: state.modalReducer,
    participantReducer: state.participantReducer
  };
};

export default connect(mapStateToProps, actions)(withStyles({})(Setting));
