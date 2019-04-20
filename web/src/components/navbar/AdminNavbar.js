import React, {Component} from "react";
import {withStyles} from "@material-ui/core";
import {adminNavbarStyles} from "../styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import AuthItem from "./AuthItem";

class AdminNavbar extends Component {
  render() {
    const {classes} = this.props;

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Basket Finder Dashboard
          </Typography>
          <AuthItem />
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(adminNavbarStyles)(AdminNavbar);
