import React, { Component } from 'react';
import {GoogleLogin, GoogleLogout} from "react-google-login";
import {GOOGLE_CLIENT_ID} from "../../config";
import Button from "@material-ui/core/Button/Button";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Popper from "@material-ui/core/Popper/Popper";
import Grow from "@material-ui/core/Grow/Grow";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList/MenuList";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {withStyles} from "@material-ui/core";
import MyCreatedEvents from "../modal/MyCreatedEvents";
import MyJoinedEvents from "../modal/MyJoinedEvents";
import { connect } from 'react-redux';
import * as actions from './../../actions';

class AuthItem extends Component {
  state = {
    open: false,
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMyEventsModal = () => {
    this.setState({ anchorEl: null });
    this.props.toggleMyEventModalAction(true);
  };

  handleMyJoinedEventsModal = () => {
    this.setState({ anchorEl: null });
    this.props.toggleMyJoinedEventModalAction(true);
  };

  responseGoogle = (response) => {
    console.error(response);
  };

  onGoogleSuccess = (response) => {
    this.props.checkUserAction(response.tokenObj);
  };

  onLogoutSuccess = () => {
    this.props.logoutUser();
  };

  render() {
    const {userReducer, modalReducer} = this.props;

    if (!userReducer || !userReducer.isAuthenticated) {
      return (
        <div>
          <GoogleLogin
            style={{borderRadius: 100}}
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Prisijungti"
            isSignedIn={true}
            onSuccess={this.onGoogleSuccess}
            onFailure={this.responseGoogle}
          />
        </div>
      );
    }

    const user = userReducer.auth;
    const open = Boolean(this.state.anchorEl);

    return (
      <div>
        <Button color="inherit" onClick={this.handleMenu}>
          <Avatar alt="Profile Picture" src={user.googleImage} style={{marginRight: 10}}/>
          {user.firstName + ' ' + user.lastName}
        </Button>
        <Popper open={open} anchorEl={this.state.anchorEl} transition disablePortal>
          {({TransitionProps, placement}) => (
            <Grow {...TransitionProps} id="menu-list-grow"
                  style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={this.handleMyEventsModal}>Mano varzybos</MenuItem>
                    <MenuItem onClick={this.handleMyJoinedEventsModal}>Mano dalyvavimas</MenuItem>
                    <MenuItem onClick={this.handleClose}>
                      <GoogleLogout
                        buttonText="Atsijungti"
                        onLogoutSuccess={this.onLogoutSuccess}
                        style={{boxShadow: 'none !important'}}
                      />
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        <MyCreatedEvents
            open={modalReducer.isMyEventOpen}
            user={user}
        />
        <MyJoinedEvents
            open={modalReducer.isMyJoinedEventOpen}
            user={user}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    modalReducer: state.modalReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles({})(AuthItem));
