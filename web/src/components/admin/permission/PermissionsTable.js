import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import {withStyles} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import DownloadIcon from '@material-ui/icons/SaveAlt';
import IconButton from "@material-ui/core/IconButton";
import {modalStyles, tableStyles} from "../../styles";
import Modal from "@material-ui/core/Modal";
import AprovePermissionForm from "../form/AprovePermissionForm";
import {API_URL} from "../../../config";

class PermissionsTable extends Component {

  state = {
    activePermission: null,
    open: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.permissionReducer.reload) {
      this.setState({open: false, activePermission: null});
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
    this.props.deletePermissionAction(permission.id);
  };

  renderPermissionAproveForm = (activePermission) => {
    if (activePermission) {
      return <AprovePermissionForm
        permission={activePermission}
        handleClose={this.handleClose} />
    }
  };

  render() {
    const {classes, permissions, pending} = this.props;

    return (
      <div>
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
            {permissions && permissions.length > 0 ? permissions.map(permission => (
              <TableRow className={classes.row} key={permission.id}>
                <TableCell component="th" scope="row" className={classes.dataCell}>
                  {permission.gymCourt.name}
                </TableCell>
                <TableCell className={classes.dataCell}>{permission.gymCourt.address}</TableCell>
                <TableCell className={classes.dataCell}>{permission.user.firstName + ' ' + permission.user.lastName}</TableCell>
                <TableCell className={classes.dataCell}>{permission.user.email}</TableCell>
                <TableCell className={classes.dataCell}>{permission.message}</TableCell>
                <TableCell className={classes.dataCell}>{permission.filePath ?
                  <IconButton>
                    <a href={API_URL + '/permission/download/' + permission.filePath}><DownloadIcon /></a>
                  </IconButton>: '-' }
                  </TableCell>
                <TableCell>
                  {this.props.pending ?
                    <IconButton aria-label="Delete" color={"primary"} onClick={() => this.handleOpen(permission)}>
                      <CreateIcon style={{height: '1.2rem', width: '1.2rem'}} />
                    </IconButton> : ''
                  }
                  <IconButton aria-label="Delete" color={"secondary"} onClick={() => this.handleDelete(permission)}>
                    <DeleteIcon style={{height: '1.2rem', width: '1.2rem'}} />
                  </IconButton>
                </TableCell>
              </TableRow>
            )) : <TableRow>
                <TableCell colSpan={7} style={{border: 'none'}}>
                  <Typography variant="h5" style={{textAlign: 'center'}}>
                    {pending ? 'Nėra nepatvirtintų prašymų' : 'Nėra aktyviu prašymų'}</Typography>
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

export default connect(mapStateToProps, actions)(withStyles(tableStyles)(PermissionsTable));
