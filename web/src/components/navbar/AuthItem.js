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
import Modal from "@material-ui/core/Modal";
import {courtStyles, modalStyles} from "../styles";
import CreateCourtForm from "../form/CreateCourtForm";
import CreateGymCourtForm from "../form/CreateGymCourtForm";

class AuthItem extends Component {
  state = {
    open: false,
    anchorEl: null,
    addCourtOpen: false,
    addGymCourtOpen: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {courtsReducer} = this.props;

    if (!prevProps.courtsReducer.created && courtsReducer.created) {
      this.setState({addCourtOpen: false});
      this.setState({addGymCourtOpen: false});
    }
  }

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
    localStorage.setItem('token', response.accessToken);
  };

  onLogoutSuccess = () => {
    this.props.logoutUser();
  };

  onAddCourt = () => {
    this.setState({addCourtOpen: true});
  };

  onAddGymCourt = () => {
    this.setState({addGymCourtOpen: true});
  };

  handleAddCourtClose = () => {
    this.setState({addCourtOpen: false});
  };

  handleAddGymCourtClose = () => {
    this.setState({addGymCourtOpen: false});
  };

  render() {
    const {userReducer, classes} = this.props;

    if (!localStorage.getItem('token') || !userReducer || !userReducer.isAuthenticated) {
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
                    {user.roles.includes('ROLE_ADMIN') ?
                      <MenuItem onClick={() => {window.location.href = '/admin'}}>
                        Administracinis valdymas
                      </MenuItem> : ''
                    }
                    <MenuItem onClick={this.onAddCourt}>
                      Pridėti lauko aikštelę
                    </MenuItem>
                    <MenuItem onClick={this.onAddGymCourt}>
                      Pridėti vidaus aikštelę
                    </MenuItem>
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

        <Modal
          open={this.state.addCourtOpen}
          onClose={this.handleAddCourtClose}
        >
          <div style={modalStyles} className={classes.paper}>
            <CreateCourtForm handleClose={this.handleAddCourtClose}/>
          </div>
        </Modal>

        <Modal
          open={this.state.addGymCourtOpen}
          onClose={this.handleAddGymCourtClose}
        >
          <div style={modalStyles} className={classes.paper}>
            <CreateGymCourtForm handleClose={this.handleAddGymCourtClose}/>
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    courtsReducer: state.courtsReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(courtStyles)(AuthItem));
