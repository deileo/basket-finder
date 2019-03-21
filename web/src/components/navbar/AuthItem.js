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
import { connect } from 'react-redux';
import * as actions from './../../actions';

class AuthItem extends Component {
  state = {
    open: false,
    anchorEl: null,
  };

  handleMenu = (event) => {
    let isOpen = this.state.open;
    this.setState({open: !isOpen});
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
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
    const {userReducer} = this.props;

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

    return (
      <div>
        <Button color="inherit" onClick={this.handleMenu}>
          <Avatar alt="Profile Picture" src={user.googleImage} style={{marginRight: 10}}/>
          {user.firstName + ' ' + user.lastName}
        </Button>
        <Popper open={this.state.open} anchorEl={this.state.anchorEl} transition disablePortal>
          {({TransitionProps}) => (
            <Grow {...TransitionProps} id="menu-list-grow" style={{transformOrigin: 'center top'}}>
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles({})(AuthItem));
