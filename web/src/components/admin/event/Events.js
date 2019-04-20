import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EventLoader from "../../EventLoader";
import {tableStyles} from "../../styles";
import EventsTable from "./EventsTable";
import {TYPE_COURT, TYPE_GYM_COURT} from "../../../actions/types";

class Events extends Component {

  state = {
    activeEvent: null,
    open: false,
  };

  componentDidMount() {
    this.props.getAllEventsAction();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {eventReducer} = this.props;

    if (eventReducer && eventReducer.reload) {
      this.setState({open: false, activeEvent: null});
      this.props.getAllEventsAction();
      this.props.resetEventCreationAction();
    }
  }

  handleClose = () => {
    this.setState({
      activeEvent: null,
      open: false,
    });
  };

  render() {
    const {classes, eventReducer, loaderReducer} = this.props;
    if (!eventReducer) {
      return null;
    }

    return (
      <div>
        <Typography variant="h5">Lauko aikštelių rungtynės</Typography>
        <Paper className={classes.root} style={{marginBottom: 50, height: '35vh'}}>
          {loaderReducer.isEventsLoading ?
            <EventLoader/> :
            <EventsTable
              events={eventReducer.events ? eventReducer.events.court : null}
              type={TYPE_COURT}
            />
          }
        </Paper>

        <Typography variant="h5">Vidaus aikštelių rungtynės</Typography>
        <Paper className={classes.root} style={{height: '35vh'}}>
          {loaderReducer.isEventsLoading ?
            <EventLoader/> :
            <EventsTable
              events={eventReducer.events ? eventReducer.events.gymCourt : null}
              type={TYPE_GYM_COURT}
            />
          }
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventReducer: state.eventReducer,
    loaderReducer: state.loaderReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(tableStyles)(Events));
