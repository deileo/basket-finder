import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import {TYPE_COURT, TYPE_GYM_COURT} from "../../actions/types";
import AuthItem from "./AuthItem";
import { connect } from 'react-redux';
import * as actions from './../../actions';
import {navbarStyles} from '../styles'
import Setting from "./Setting";

class Navbar extends Component {
  state = {
    type: 0,
  };

  componentDidMount() {
    this.props.changeCourtType(TYPE_COURT)
  }

  handleChange = (event, type) => {
    this.props.setCourtToNull();
    this.props.changeCourtType(type === 0 ? TYPE_COURT : TYPE_GYM_COURT);
    this.props.fetchCourtsAction(type === 0 ? TYPE_COURT : TYPE_GYM_COURT);
    this.props.getEventsAction(type === 0 ? TYPE_COURT : TYPE_GYM_COURT);
    this.setState({type});
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
              <Tab label="Lauko aikštelės" />
              <Tab label="Vidaus aikštelės" />
            </Tabs>
            {userReducer.isAuthenticated ? <Setting /> : ''}
            <AuthItem />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(navbarStyles)(Navbar));
