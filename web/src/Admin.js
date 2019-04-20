import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FlashMessage from "./components/flash/FlashMessage";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LockIcon from '@material-ui/icons/Lock';
import PinDropIcon from '@material-ui/icons/PinDrop';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import AdminNavbar from "./components/navbar/AdminNavbar";
import {adminNavbarStyles} from "./components/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Permissions from "./components/admin/permission/Permissions";
import Courts from "./components/admin/court/Courts";
import Events from "./components/admin/event/Events";
import Users from "./components/admin/user/Users";
import {connect} from "react-redux";
import * as actions from "./actions";

class Admin extends Component {
  state = {
    activeElement: 0,
  };

  setActiveElement = (element) => {
    this.setState({activeElement: element});
  };

  renderContent = () => {
    const {activeElement} = this.state;

    switch (activeElement) {
      case 0: {
        return (<Permissions />)
      }
      case 1: {
        return (<Courts />)
      }
      case 2: {
        return (<Events />)
      }
      case 3: {
        return (<Users />)
      }
      default: {
        return null;
      }
    }
  };

  render() {
    const { classes, userReducer } = this.props;

    if (userReducer.auth && !userReducer.auth.roles.includes('ROLE_ADMIN')) {
      return null;
    }

    return (
      <div>
        <AdminNavbar />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{paper: classes.drawerPaper}}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button onClick={() => {this.setActiveElement(0)}}>
              <ListItemIcon><LockIcon /></ListItemIcon>
              <ListItemText primary={'Prašymai'} />
            </ListItem>
            <ListItem button onClick={() => {this.setActiveElement(1)}}>
              <ListItemIcon><PinDropIcon /></ListItemIcon>
              <ListItemText primary={'Aikštynai'} />
            </ListItem>
            <ListItem button onClick={() => {this.setActiveElement(2)}}>
              <ListItemIcon><FitnessCenterIcon/></ListItemIcon>
              <ListItemText primary={'Varžybos'} />
            </ListItem>
            <ListItem button onClick={() => {this.setActiveElement(3)}}>
              <ListItemIcon><AccountBoxIcon /></ListItemIcon>
              <ListItemText primary={'Vartotojai'} />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => {window.location.href = '/'}}>
              <ListItemIcon><BackIcon /></ListItemIcon>
              <ListItemText primary={'Išeitį'} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.renderContent()}
        </main>
        <Grid>
          <FlashMessage />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(adminNavbarStyles)(Admin));
