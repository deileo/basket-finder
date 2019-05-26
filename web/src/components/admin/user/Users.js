import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EventLoader from "../../EventLoader";
import {tableStyles} from "../../styles";
import UsersTable from "./UsersTable";
import Grid from "@material-ui/core/Grid";

class Users extends Component {

  componentDidMount() {
    this.props.getUsersAction();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {userReducer} = this.props;

    if (userReducer.reload) {
      this.props.getUsersAction();
      this.props.setReloadUsersToFalse();
    }
  }

  render() {
    const {classes, userReducer, loaderReducer} = this.props;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item lg={12} xs={12}>
            <Typography variant="h5">Vartotojai</Typography>
            <Paper className={classes.root} style={{marginBottom: 50, minHeight: '25vh'}}>
              {loaderReducer.isEventsLoading ?
                <EventLoader/> :
                <UsersTable
                  users={userReducer.users}
                />
              }
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    loaderReducer: state.loaderReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(tableStyles)(Users));
