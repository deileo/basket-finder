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
import IconButton from "@material-ui/core/IconButton";
import {tableStyles} from "../../styles";
import CheckIcon from '@material-ui/icons/Check';

class UsersTable extends Component {

  state = {
    users: null,
  };

  handleDelete = (user) => {
    this.props.disableUserAction(user);
  };

  handleEnable = (user) => {
    this.props.enableUserAction(user);
  };

  render() {
    const {classes, users} = this.props;

    return (
      <div>
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.cell}>Vardas</TableCell>
              <TableCell className={classes.cell}>El. paštas</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 ? users.map(user => (
              <TableRow className={classes.row} key={user.id}>
                <TableCell component="th" scope="row" className={classes.dataCell}>{user.firstName + ' ' + user.lastName}</TableCell>
                <TableCell className={classes.dataCell}>{user.email}</TableCell>
                <TableCell>
                  {!user.disabled ?
                    <IconButton aria-label="Delete" color={"secondary"} onClick={() => this.handleDelete(user)}>
                      <DeleteIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                    </IconButton> :

                    < IconButton aria-label = "Enable" color={"primary"} onClick={() => this.handleEnable(user)}>
                      <CheckIcon style={{height: '1.2rem', width: '1.2rem'}} />
                    </IconButton>
                  }
                </TableCell>
              </TableRow>
            )) : <TableRow>
                <TableCell colSpan={7} style={{border: 'none'}}>
                  <Typography variant="h5" style={{textAlign: 'center'}}>
                    Nėra vartotojų
                  </Typography>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(tableStyles)(UsersTable));
