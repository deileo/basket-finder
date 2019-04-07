import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../../../actions";
import {withStyles} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Typography from "@material-ui/core/Typography";
import {tableStyles} from "../../styles";
import {TYPE_GYM_COURT} from "../../../actions/types";
import DoneIcon from "@material-ui/icons/Done";
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

class CourtsTable extends Component {

  state = {
    activePermission: null,
    open: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  handleEnable = (type, court) => {
    this.props.enableCourtAction(type, court);
  };

  handleDisable = (type, court) => {
    this.props.disableCourtAction(type, court);
  };

  handleDelete = (type, court) => {
    this.props.handleDeleteAction(type, court);
  };

  render() {
    const {classes, courts, type} = this.props;

    return (
      <TableBody>
        {courts && courts.length > 0 ? courts.map(court => (
          <TableRow className={classes.row} key={court.id}>
            {type === TYPE_GYM_COURT ?
              <TableCell component="th" scope="row" className={classes.dataCell}>
              {court.name}
              </TableCell> : null}
              <TableCell className={classes.dataCell}>{court.address}</TableCell>
              <TableCell className={classes.dataCell}>{court.location}</TableCell>
              <TableCell className={classes.dataCell}>{court.description ? court.description : '-' }</TableCell>
              <TableCell style={{textAlign: 'center'}}>
                {court.enabled ?
                  <IconButton aria-label="Disable" color={"secondary"} onClick={() => this.handleDisable(type, court)} style={{float: "right"}}>
                    <RemoveIcon style={{height: '1.2rem', width: '1.2rem'}} />
                  </IconButton> :
                  <div style={{float: "right"}}>
                    <IconButton aria-label="Enable" color={"primary"} onClick={() => this.handleEnable(type, court)}>
                      <DoneIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                    </IconButton>
                    <IconButton aria-label="Delete" color={"secondary"} onClick={() => this.handleDelete(type, court)}>
                      <DeleteIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                    </IconButton>
                  </div>
                }
              </TableCell>
            </TableRow>
          )) : <TableRow>
            <TableCell colSpan={6} style={{border: 'none'}}>
              <Typography variant="h5" style={{textAlign: 'center'}}>Nėra aikštelių</Typography>
              </TableCell>
          </TableRow>
        }
      </TableBody>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    courtsReducer: state.courtsReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(tableStyles)(CourtsTable));
