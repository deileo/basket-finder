import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EventLoader from "../../EventLoader";
import PermissionsTable from "./PermissionsTable";
import {tableStyles} from "../../styles";

class Permissions extends Component {

  state = {
    activePermission: null,
    open: false,
  };

  componentDidMount() {
    this.props.getPermissionsAction();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {permissionReducer} = this.props;

    if (permissionReducer.reload) {
      this.setState({open: false, activePermission: null});
      this.props.getPermissionsAction();
      this.props.resetPermisionRequestState();
    }
  }

  handleClose = () => {
    this.setState({
      activePermission: null,
      open: false,
    });
  };

  render() {
    const {classes, permissionReducer, loaderReducer} = this.props;

    return (
      <div>
        <Typography variant="h5">Nepatvirtinti prašymai</Typography>
        <Paper className={classes.root} style={{marginBottom: 50, height: '35vh'}}>
          {loaderReducer.isEventsLoading ?
            <EventLoader/> :
            <PermissionsTable
              permissions={permissionReducer.permissions ? permissionReducer.permissions.pending : null}
              pending={true}
            />
          }
        </Paper>

        <Typography variant="h5">Aktyvūs prašymai</Typography>
        <Paper className={classes.root} style={{height: '35vh'}}>
          {loaderReducer.isEventsLoading ?
            <EventLoader/> :
            <PermissionsTable
              permissions={permissionReducer.permissions ? permissionReducer.permissions.active : null}
              pending={false}
            />
          }
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    permissionReducer: state.permissionReducer,
    loaderReducer: state.loaderReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(tableStyles)(Permissions));
