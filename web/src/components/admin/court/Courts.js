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
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import TableBody from "@material-ui/core/TableBody";
import DoneIcon from "@material-ui/icons/Done";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';

class Courts extends Component {
  state = {
    activeCourt: null,
    gymCourts: [],
    courts: [],
    gymCourtValue: 0,
    courtValue: 0,
  };

  componentDidMount() {
    this.props.fetchAdminCourtsAction();
    this.props.fetchAdminGymCourtsAction();
    this.props.fetchAdminNewCourtsAction();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {courtsReducer} = this.props;

    if (courtsReducer.reload) {
      if (courtsReducer.reloadType === TYPE_GYM_COURT) {
        this.props.fetchAdminGymCourtsAction();
      }

      if (courtsReducer.reloadType === TYPE_COURT) {
        this.props.fetchAdminCourtsAction();
      }

      this.props.fetchAdminNewCourtsAction();
      this.props.setReloadToFalse();
    }
  }

  handleCourtChange = (event, value) => {
    this.setState({courtValue: value});
  };

  handleGymCourtChange = (event, value) => {
    this.setState({gymCourtValue: value});
  };

  handleEnable = (type, court) => {
    this.props.enableCourtAction(type, court);
  };

  handleDelete = (type, court) => {
    this.props.handleDeleteAction(type, court);
  };

  getCourts(type) {
    const {courtsReducer} = this.props;

    if (type === TYPE_GYM_COURT && courtsReducer.gymCourts) {
      return this.state.gymCourtValue === 0 ? courtsReducer.gymCourts.active : courtsReducer.gymCourts.disabled;
    }

    if (type === TYPE_COURT && courtsReducer.courts) {
      return this.state.courtValue === 0 ? courtsReducer.courts.active : courtsReducer.courts.disabled;
    }

    return null;
  }

  getCourtType(court) {
    return court.name ? TYPE_GYM_COURT : TYPE_COURT;
  }

  render() {
    const {classes, loaderReducer, courtsReducer} = this.props;
    const {gymCourtValue, courtValue} = this.state;

    return (
      <Grid container spacing={24}>
        <Grid item lg={12} xs={12}>
          <Typography variant="h5">Naujos aikštelės</Typography>
          <Paper className={classes.root} style={{marginBottom: 50, height: '25vh'}}>
            {loaderReducer.isEventsLoading ?
              <EventLoader/> :
              <Table className={classes.table}>
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell className={classes.cell}>Aikštelės tipas</TableCell>
                    <TableCell className={classes.cell}>Vieta</TableCell>
                    <TableCell className={classes.cell}>Adresas</TableCell>
                    <TableCell className={classes.cell}>Rajonas</TableCell>
                    <TableCell className={classes.cell}>Informacija</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courtsReducer.newCourts && courtsReducer.newCourts.length > 0 ? courtsReducer.newCourts.map(court => (
                    <TableRow className={classes.row} key={court.id + court.address}>
                      <TableCell component="th" scope="row" className={classes.dataCell}>
                        {this.getCourtType(court) === TYPE_GYM_COURT ? 'Vidaus aikštelė' : 'Lauko aikštelė'}
                      </TableCell>
                      <TableCell component="th" scope="row" className={classes.dataCell}>{court.name ? court.name : '-'}</TableCell>
                      <TableCell className={classes.dataCell}>{court.address}</TableCell>
                      <TableCell className={classes.dataCell}>{court.location}</TableCell>
                      <TableCell className={classes.dataCell}>{court.description ? court.description : '-' }</TableCell>
                      <TableCell style={{textAlign: 'center'}}>
                        <div style={{display: "inline-flex"}}>
                          <IconButton
                            aria-label="Enable"
                            color={"primary"}
                            onClick={() => this.handleEnable(this.getCourtType(court), court)}
                          >
                            <DoneIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            color={"secondary"}
                            onClick={() => this.handleDelete(this.getCourtType(court), court)}
                          >
                            <DeleteIcon style={{height: '1.2rem', width: '1.2rem'}}/>
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow>
                    <TableCell colSpan={6} style={{border: 'none'}}>
                      <Typography variant="h5" style={{textAlign: 'center'}}>Nėra naujų aikštelių</Typography>
                    </TableCell>
                  </TableRow>
                }
                </TableBody>
              </Table>
            }
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Typography variant="h5">Vidaus aikštelės</Typography>
          <Paper className={classes.root} style={{height: '45vh'}}>
            {loaderReducer.isEventsLoading ?
              <EventLoader/> :
              <Table className={classes.table}>
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Tabs value={gymCourtValue} onChange={this.handleGymCourtChange} variant="fullWidth">
                        <Tab label="Aktyvios" style={{color: '#fff'}}/>
                        <Tab label="Neaktyvios" style={{color: '#fff'}}/>
                      </Tabs>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.cell}>Vieta</TableCell>
                    <TableCell className={classes.cell}>Adresas</TableCell>
                    <TableCell className={classes.cell}>Rajonas</TableCell>
                    <TableCell className={classes.cell}>Informacija</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <CourtsTable
                  courts={this.getCourts(TYPE_GYM_COURT)}
                  type={TYPE_GYM_COURT}
                />
              </Table>
            }
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Typography variant="h5">Lauko aikštelės</Typography>
          <Paper className={classes.root} style={{height: '45vh'}}>
            {loaderReducer.isEventsLoading ?
              <EventLoader/> :
              <Table className={classes.table}>
                <TableHead className={classes.head}>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Tabs value={courtValue} onChange={this.handleCourtChange} variant="fullWidth">
                        <Tab label="Aktyvios" style={{color: '#fff'}}/>
                        <Tab label="Neaktyvios" style={{color: '#fff'}}/>
                      </Tabs>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.cell}>Adresas</TableCell>
                    <TableCell className={classes.cell}>Rajonas</TableCell>
                    <TableCell className={classes.cell}>Informacija</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <CourtsTable
                  courts={this.getCourts(TYPE_COURT)}
                  type={TYPE_COURT} />
              </Table>
            }
          </Paper>
        </Grid>
      </Grid>
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

