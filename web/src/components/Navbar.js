import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import {TYPE_COURT} from "../actions/types";
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {GOOGLE_CLIENT_ID} from "../config";
import Avatar from "@material-ui/core/Avatar/Avatar";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Paper from "@material-ui/core/Paper/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList/MenuList";
import Grow from "@material-ui/core/Grow/Grow";
import Popper from "@material-ui/core/Popper/Popper";


const styles = ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  drawer: {
    width: 'auto',
    flexShrink: 0,
  },
  drawerPaper: {
    width: 'auto',
    top: '4rem'
  },
});

class Navbar extends Component {
  state = {
    open: false,
    anchorEl: null,
    type: TYPE_COURT,
  };

  componentDidMount() {
    this.props.changeCourtType(TYPE_COURT)
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderAuth(userReducer) {
    if (!userReducer || !userReducer.isAuthenticated) {
      return (
        <GoogleLogin
          style={{borderRadius: 100}}
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Prisijungti"
          isSignedIn={true}
          onSuccess={this.onGoogleSuccess}
          onFailure={this.responseGoogle}
        />
      )
    }

    const user = this.props.userReducer.auth;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button color="inherit" onClick={this.handleMenu}>
          <Avatar alt="Profile Picture" src={user.googleImage} style={{marginRight: 10}}/>
          {user.firstName + ' ' + user.lastName}
        </Button>
        <Popper open={open} anchorEl={anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps} id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem onClick={this.handleClose}>Mano varzybos</MenuItem>
                    <MenuItem onClick={this.handleClose}>Mano dalyvavimas</MenuItem>
                    <MenuItem onClick={this.handleClose}>Atsijungti</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }

  handleChange = (event, type) => {
    this.props.changeCourtType(type);
    this.props.fetchCourts(type);
    this.setState({ type });
  };

  responseGoogle = (response) => {
    console.error(response);
  };

  onGoogleSuccess = (response) => {
    this.props.checkUserAction(response.tokenObj);
  };

  render() {
    const { classes, userReducer } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Basket Finder
            </Typography>
            <Tabs value={this.state.type} onChange={this.handleChange}>
              <Tab label="Lauko aiksteles" />
              <Tab label="Vidaus aisteles" />
            </Tabs>
            {this.renderAuth(userReducer)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
