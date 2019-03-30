import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from "@material-ui/core/IconButton";
import {modalStyles} from "../../styles";
import Modal from "@material-ui/core/Modal";
import AprovePermissionForm from "../form/AprovePermissionForm";

const tableStyles = (theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
  },
  cell: {
    fontSize: 12,
    color: theme.palette.primary.contrastText,
  },
  dataCell: {
    fontSize: 14,
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 2,
    width: theme.spacing.unit * 50,
  },
});

class Permissions extends Component {

  state = {
    activePermission: null,
    open: false,
  };

  componentDidMount() {
    const {userReducer} = this.props;

    if (userReducer && userReducer.isAuthenticated) {
      this.props.getPermissionsAction(userReducer.auth.googleAccessToken);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {userReducer, permissionReducer} = this.props;

    if (!prevProps.userReducer.isAuthenticated && userReducer.isAuthenticated) {
      this.props.getPermissionsAction(userReducer.auth.googleAccessToken);
    }

    if (permissionReducer.reload) {
      this.setState({open: false, activePermission: null});
      this.props.getPermissionsAction(userReducer.auth.googleAccessToken);
      this.props.resetPermisionRequestState();
    }
  }

  handleClose = () => {
    this.setState({
      activePermission: null,
      open: false,
    });
  };

  handleOpen = (permission) => {
    this.setState({
      activePermission: permission,
      open: true
    });
  };

  handleDelete = (permission) => {
    const {userReducer} = this.props;

    this.props.deletePermissionAction(permission.id, userReducer.auth.googleAccessToken);
  };

  renderPermissionAproveForm = (activePermission) => {
    if (activePermission) {
      return <AprovePermissionForm
        permission={activePermission}
        handleClose={this.handleClose} />
    }
  };

  render() {
    const {classes, permissionReducer} = this.props;

    return (
      <div>
        <Typography variant="h5">Nepatvirtinti prašymai</Typography>
        <Paper className={classes.root} style={{marginBottom: 50, height: '35vh'}}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.cell}>Aikštelė</TableCell>
                <TableCell className={classes.cell}>Adresas</TableCell>
                <TableCell className={classes.cell}>Vartotojas</TableCell>
                <TableCell className={classes.cell}>El. paštas</TableCell>
                <TableCell className={classes.cell}>Prašymas</TableCell>
                <TableCell className={classes.cell}>Sutartis</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissionReducer.permissions && permissionReducer.permissions.pending.length > 0 ?
                permissionReducer.permissions.pending.map(permission => (
                  <TableRow className={classes.row} key={permission.id}>
                    <TableCell component="th" scope="row" className={classes.dataCell}>
                      {permission.gymCourt.name}
                    </TableCell>
                    <TableCell className={classes.dataCell}>{permission.gymCourt.address}</TableCell>
                    <TableCell
                      className={classes.dataCell}>{permission.user.firstName + ' ' + permission.user.lastName}</TableCell>
                    <TableCell className={classes.dataCell}>{permission.user.email}</TableCell>
                    <TableCell className={classes.dataCell}>{permission.message}</TableCell>
                    <TableCell className={classes.dataCell}>{permission.filePath ? 'Atsisiųsti' : '-'}</TableCell>
                    <TableCell>
                      <IconButton aria-label="Delete" color={"primary"} onClick={() => this.handleOpen(permission)}>
                        <CreateIcon style={{height: '1.2rem', width: '1.2rem'}} />
                      </IconButton>
                      <IconButton aria-label="Delete" color={"secondary"} onClick={() => this.handleDelete(permission)}>
                        <DeleteIcon style={{height: '1.2rem', width: '1.2rem'}} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )) : <TableRow>
                  <TableCell colSpan={7} style={{border: 'none'}}>
                    <Typography variant="h5" style={{textAlign: 'center'}}>Nėra nepatvirtintų prašymų</Typography>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>

          <Modal
            open={this.state.open}
            onClose={this.handleClose}
          >
            <div style={modalStyles} className={classes.paper}>
              {this.renderPermissionAproveForm(this.state.activePermission)}
            </div>
          </Modal>
        </Paper>

        <Typography variant="h5">Aktyvūs prašymai</Typography>
        <Paper className={classes.root} style={{height: '35vh'}}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell className={classes.cell}>Aikštelė</TableCell>
                <TableCell className={classes.cell}>Adresas</TableCell>
                <TableCell className={classes.cell}>Vartotojas</TableCell>
                <TableCell className={classes.cell}>El. paštas</TableCell>
                <TableCell className={classes.cell}>Prašymas</TableCell>
                <TableCell className={classes.cell}>Sutartis</TableCell>
                <TableCell/>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissionReducer.permissions && permissionReducer.permissions.active.length > 0 ?
                permissionReducer.permissions.active.map(permission => (
                  <TableRow className={classes.row} key={permission.id}>
                    <TableCell component="th" scope="row" className={classes.dataCell}>
                      {permission.gymCourt.name}
                    </TableCell>
                    <TableCell className={classes.dataCell}>{permission.gymCourt.address}</TableCell>
                    <TableCell
                      className={classes.dataCell}>{permission.user.firstName + ' ' + permission.user.lastName}</TableCell>
                    <TableCell className={classes.dataCell}>{permission.user.email}</TableCell>
                    <TableCell className={classes.dataCell}>{permission.message}</TableCell>
                    <TableCell className={classes.dataCell}>{permission.filePath ? 'Atsisiųsti' : '-'}</TableCell>
                    <TableCell>
                      <IconButton aria-label="Delete" color={"secondary"} onClick={() => this.handleDelete(permission)}>
                        <DeleteIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )) : <TableRow>
                  <TableCell colSpan={7} style={{border: 'none'}}>
                    <Typography variant="h5" style={{textAlign: 'center'}}>Nėra aktyvių prašymų</Typography>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    permissionReducer: state.permissionReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(tableStyles)(Permissions));
