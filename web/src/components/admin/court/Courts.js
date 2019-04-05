import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import {withStyles} from "@material-ui/core";
import {tableStyles} from "../../styles";
import EventLoader from "../../EventLoader";
import CourtsTable from "./CourtsTable";
import {TYPE_COURT, TYPE_GYM_COURT} from "../../../actions/types";

class Courts extends Component {
  state = {
    activeCourt: null,
    gymCourts: [],
    courts: []
  };

  componentDidMount() {
    this.props.fetchAdminCourtsAction();
    this.props.fetchAdminGymCourtsAction();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    const {classes, loaderReducer, courtsReducer} = this.props;
    console.log(this.props.courtsReducer);
    return (
      <div>
        <Typography variant="h5">Vidaus aikštelės</Typography>
        <Paper className={classes.root} style={{marginBottom: 50, height: '35vh'}}>
          {loaderReducer.isEventsLoading ?
            <EventLoader/> :
            <CourtsTable
              courts={courtsReducer.gymCourts ? courtsReducer.gymCourts.disabled : null}
              type={TYPE_GYM_COURT} />
          }
        </Paper>

        <Typography variant="h5">Lauko aikštelės</Typography>
        <Paper className={classes.root} style={{height: '35vh'}}>
          {loaderReducer.isEventsLoading ?
            <EventLoader/> :
            <CourtsTable
              courts={courtsReducer.courts ? courtsReducer.courts.disabled : null}
              type={TYPE_COURT} />
          }
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    courtsReducer: state.courtsReducer,
    loaderReducer: state.loaderReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(tableStyles)(Courts));

