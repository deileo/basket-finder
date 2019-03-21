import React, {Component} from 'react';
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import {withStyles} from "@material-ui/core";
import {connect} from 'react-redux';
import * as actions from './../../actions';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from "@material-ui/core/IconButton";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MyCreatedEvents from "../event/MyCreatedEvents";
import MyJoinedEvents from "../event/MyJoinedEvents";

class Setting extends Component {
  state = {
    open: false,
    value: 0,
    anchorEl: null,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.open && this.state.open) {
      this.props.getUserCreatedEventsAction(this.props.userReducer.auth.googleAccessToken);
      this.props.getUserJoinedEventsAction(this.props.userReducer.auth.googleAccessToken);
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
    const {classes} = this.props;

    return (
      <div>
        <IconButton className={classes.menuButton} color="inherit" onClick={this.toggleTab}>
          <SettingsIcon />
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
                  <Tab label="Sukurtos varzybos"/>
                  <Tab label="Dalyvavimai"/>
                  <Tab label="Prasymai"/>
                </Tabs>
                {this.state.value === 0 && <MyCreatedEvents />}
                {this.state.value === 1 && <MyJoinedEvents />}
                {this.state.value === 2 && <Typography variant={"body1"}>
                  789456123</Typography>}
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
  };
};

export default connect(mapStateToProps, actions)(withStyles({})(Setting));
