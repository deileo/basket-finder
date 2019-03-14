import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import {TYPE_COURT} from "../../actions/types";
import AuthItem from "./AuthItem";


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
    type: TYPE_COURT,
  };

  componentDidMount() {
    this.props.changeCourtType(TYPE_COURT)
  }

  handleChange = (event, type) => {
    this.props.setCourtToNull();
    this.props.changeCourtType(type);
    this.props.fetchCourtsAction(type);
    this.props.getEventsAction(type);
    this.setState({ type });
  };

  render() {
    const { classes } = this.props;
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
            <AuthItem
              userReducer={this.props.userReducer}
              eventReducer={this.props.eventReducer}
              checkUserAction={this.props.checkUserAction}
              logoutUser={this.props.logoutUser}
              toggleMyEventModalAction={this.props.toggleMyEventModalAction}
              toggleMyJoinedEventModalAction={this.props.toggleMyJoinedEventModalAction}
              modalReducer={this.props.modalReducer}
              getUserCreatedEventsAction={this.props.getUserCreatedEventsAction}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
