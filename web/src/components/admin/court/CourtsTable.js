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
import {tableStyles} from "../../styles";
import {TYPE_GYM_COURT} from "../../../actions/types";

class CourtsTable extends Component {

  state = {
    activePermission: null,
    open: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  render() {
    const {classes, courts, type} = this.props;

    return (
      <div>
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              {type === TYPE_GYM_COURT ? <TableCell className={classes.cell}>Vieta</TableCell> : null}
              <TableCell className={classes.cell}>Adresas</TableCell>
              <TableCell className={classes.cell}>Rajonas</TableCell>
              <TableCell className={classes.cell}>Informacija</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
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
                <TableCell/>
              </TableRow>
            )) : <TableRow>
                <TableCell colSpan={5} style={{border: 'none'}}>
                  <Typography variant="h5" style={{textAlign: 'center'}}>Nėra aikštelių</Typography>
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
    courtsReducer: state.courtsReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(tableStyles)(CourtsTable));
