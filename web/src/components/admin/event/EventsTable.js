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
import IconButton from "@material-ui/core/IconButton";
import {modalStyles, tableStyles} from "../../styles";
import Modal from "@material-ui/core/Modal";
import EventForm from "../../form/CreateEventForm";
import {TYPE_GYM_COURT} from "../../../actions/types";
import GymEventForm from "../../form/CreateGymEventForm";
import {getConfirmedParticipantsCount, getEventTime} from "../../../services/eventService";

class EventsTable extends Component {

  state = {
    activeEvent: null,
    open: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.eventReducer.reload) {
      this.setState({open: false, activeEvent: null});
    }
  }

  handleClose = () => {
    this.setState({
      activeEvent: null,
      open: false,
    });
  };

  handleOpen = (event) => {
    this.setState({
      activeEvent: event,
      open: true
    });
  };

  handleDelete = (event) => {
    this.props.deleteEventAction(event.id, this.props.type);
  };

  renderEditEventForm = (activeEvent) => {
    if (activeEvent) {
      console.log(activeEvent.gymCourt);
      if (this.props.type === TYPE_GYM_COURT) {
        return <GymEventForm
          court={activeEvent.gymCourt}
          event={activeEvent}
          handleClose={this.handleClose}/>
      } else {
        return <EventForm
          court={activeEvent.court}
          event={activeEvent}
          handleClose={this.handleClose}/>
      }
    }
  };

  render() {
    const {classes, events, type} = this.props;

    return (
      <div>
        <Table className={classes.table}>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.cell}>Pavadinimas</TableCell>
              {type === TYPE_GYM_COURT ? <TableCell className={classes.cell}>Aikštelė</TableCell> : null}
              <TableCell className={classes.cell}>Adresas</TableCell>
              <TableCell className={classes.cell}>Laikas</TableCell>
              <TableCell className={classes.cell}>Žaidėjų skaičius</TableCell>
              {type === TYPE_GYM_COURT ? <TableCell className={classes.cell}>Kaina €</TableCell> : null}
              <TableCell className={classes.cell}>Organizatorius</TableCell>
              <TableCell className={classes.cell}>El. paštas</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {events && events.length > 0 ? events.map(event => (
              <TableRow className={classes.row} key={event.id}>
                <TableCell className={classes.dataCell}>{event.name}</TableCell>
                {type === TYPE_GYM_COURT ?
                  <TableCell className={classes.dataCell}>
                    {event.gymCourt.name}
                  </TableCell> : null
                }
                <TableCell className={classes.dataCell}>{event.gymCourt ? event.gymCourt.address : event.court.address}</TableCell>
                <TableCell className={classes.dataCell} style={{whiteSpace: 'nowrap'}}>{getEventTime(event, type)}</TableCell>
                <TableCell className={classes.dataCell}>
                  {type === TYPE_GYM_COURT ? getConfirmedParticipantsCount(event) : event.participants.length}/{event.neededPlayers}
                </TableCell>
                {type === TYPE_GYM_COURT ?
                  <TableCell className={classes.dataCell}>
                    {event.gymCourt.price ? event.gymCourt.price : '-'}
                  </TableCell> : null
                }
                <TableCell className={classes.dataCell}>{event.createdBy.firstName + ' ' + event.createdBy.lastName}</TableCell>
                <TableCell className={classes.dataCell}>{event.createdBy.email}</TableCell>
                <TableCell style={{whiteSpace: 'nowrap'}}>
                  <IconButton aria-label="Edit" color={"primary"} onClick={() => this.handleOpen(event)}>
                    <CreateIcon style={{height: '1.2rem', width: '1.2rem'}} />
                  </IconButton>
                  <IconButton aria-label="Delete" color={"secondary"} onClick={() => this.handleDelete(event)}>
                    <DeleteIcon style={{height: '1.2rem', width: '1.2rem'}} />
                  </IconButton>
                </TableCell>
              </TableRow>
            )) : <TableRow>
                <TableCell colSpan={7} style={{border: 'none'}}>
                  <Typography variant="h5" style={{textAlign: 'center'}}>
                    Nėra sukurtų rungtynių
                  </Typography>
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
            {this.renderEditEventForm(this.state.activeEvent)}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userReducer: state.userReducer,
    eventReducer: state.eventReducer,
  };
};

export default connect(mapStateToProps, actions)(withStyles(tableStyles)(EventsTable));
